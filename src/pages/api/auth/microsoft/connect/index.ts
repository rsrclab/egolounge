import { NextApiRequest, NextApiResponse } from "next";
import { buildMicrosoftAuthorizeUri } from "../../../../../data/defaults/microsoftConfig";
import { adminAuth } from "../../../../../lib/firebase/adminInit";
import { generateProcessToken } from "../../../../../utils/generateProcessToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.redirect("/");
  }

  const processToken = generateProcessToken({ expiresIn: "120000" }); // process will expire in 2 minute

  const authorizationHeader = req.headers.authorization;
  const authorizationKey = authorizationHeader?.split(" ")[1] ?? "";
  const isAnonymousRequest = authorizationHeader === undefined;

  if (isAnonymousRequest) {
    const processType = "login";
    const uri = buildMicrosoftAuthorizeUri(
      { isIncludeXboxScopes: false },
      `${processToken + " " + processType}`
    );

    return res.status(200).json({ Redirect: uri });
  } else {
    // game link process fired
    const processType = "linkGame";
    const gameName = req.body?.game_name;

    if ((gameName as string) === "halo") {
      try {
        await adminAuth.verifyIdToken(authorizationKey);

        const uri = buildMicrosoftAuthorizeUri(
          { isIncludeXboxScopes: true },
          `${processToken + " " + gameName + " " + authorizationKey + " " + processType}`
        );

        return res.status(200).json({ Redirect: uri });
      } catch (e) {
        res.status(400).json({ errMsg: "User token not valid" });
      }
    } else {
      return res.status(400).json({ errMsg: "Game name is not valid" });
    }
  }
};

export default handler;

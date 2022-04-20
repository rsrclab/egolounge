import { NextApiRequest, NextApiResponse } from "next";
import { buildSteamAuthorizationUrl, buildSteamReturnUrl } from "../../../../../data";
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
    const steamReturnUrl = buildSteamReturnUrl({ isLinkGame: false, processToken, processType });
    const uri = buildSteamAuthorizationUrl(steamReturnUrl);
    return res.status(200).json({ Redirect: uri });
  } else {
    const gameName = req.body?.game_name;
    const processType = "linkGame";
    if (
      (gameName as string) === "csgo" ||
      (gameName as string) === "pubg" ||
      (gameName as string) === "dota"
    ) {
      try {
        await adminAuth.verifyIdToken(authorizationKey);
        const steamReturnUrl = buildSteamReturnUrl({
          isLinkGame: true,
          processToken,
          processType,
          gameName,
          userToken: authorizationKey
        });
        const uri = buildSteamAuthorizationUrl(steamReturnUrl);
        return res.status(200).json({ Redirect: uri });
      } catch (e) {
        return res.status(400).json({ errMsg: "User token not valid" });
      }
    }
    return res.status(400).json({ errMsg: `Game name '${gameName}' is not valid` });
  }
};
export default handler;

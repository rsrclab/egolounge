import { NextApiRequest, NextApiResponse } from "next";
import { buildRsoAuthorizeUri } from "../../../../../data/gamePlatformApis/rsoConfig";
import { adminAuth } from "../../../../../lib/firebase/adminInit";
import { generateProcessToken } from "../../../../../utils/generateProcessToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(400).json({ errMsg: "Method not allowed" });
  }
  const { game_name, region, continent } = req.body;
  const authorizationHeader = req.headers.authorization;
  const authorizationKey = authorizationHeader?.split(" ")[1];
  if (!authorizationKey) return res.status(400).json({ errMsg: "User access token is required" });
  // check is user token valid
  try {
    await adminAuth.verifyIdToken(authorizationKey);
  } catch (e) {
    return res.status(400).json({ errMsg: "User token not valid" });
  }

  const processToken = generateProcessToken({ expiresIn: "120000" });

  if (!game_name) return res.status(400).json({ errMsg: "Game name is required" });
  if (game_name !== "valorant" && game_name !== "leagueOfLegends")
    //will be added more games here when available
    return res.status(400).json({ errMsg: `Game name ${game_name} is not valid` });

  const rsoAuthorizeUri = region
    ? buildRsoAuthorizeUri(
        processToken + " " + authorizationKey + " " + game_name + " " + region + " " + continent
      )
    : buildRsoAuthorizeUri(
        processToken + " " + authorizationKey + " " + game_name + " " + continent
      );

  return res.status(200).json({ Redirect: rsoAuthorizeUri });
};
export default handler;

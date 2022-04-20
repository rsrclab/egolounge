import { NextApiRequest, NextApiResponse } from "next";
import { buildEpicGameAuthorizationUri } from "~/data";
import { adminAuth } from "../../../../../lib/firebase/adminInit";
import { generateProcessToken } from "../../../../../utils/generateProcessToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.redirect("/");
  }
  const processToken = generateProcessToken({ expiresIn: "120000" }); // process will be expired in 2 minute
  const authorizationHeader = req.headers.authorization;
  const authorizationKey = authorizationHeader?.split(" ")[1];

  let userId = "";

  if (!authorizationKey) {
    return res.status(400).json({ errMsg: "User token required" });
  }

  try {
    const { uid } = await adminAuth.verifyIdToken(authorizationKey);
    userId = uid;
  } catch (e) {
    return res.status(400).json({ errMsg: "User token not valid" });
  }

  const gameName = req.body?.game_name;
  console.log("gamename", gameName);
  if (!gameName) {
    return res.status(400).json({ errMsg: "Game name is required" });
  }

  if (gameName === "fortnite") {
    // will be expired game name when added more game for epicgames net
    const state = processToken + " " + userId + " " + gameName;
    const battleNetAuthorizationUri = buildEpicGameAuthorizationUri(state);
    return res.status(200).json({ Redirect: battleNetAuthorizationUri });
  } else {
    return res.status(400).json({
      errMsg: `${gameName} not valid`
    });
  }
};

export default handler;

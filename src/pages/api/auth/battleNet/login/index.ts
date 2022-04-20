import { NextApiRequest, NextApiResponse } from "next";
import { battleNetRegions, buildBattleNetAuthorizationUriBasedOnRegionAndState } from "~/data";
import { adminAuth } from "../../../../../lib/firebase/adminInit";
import { generateProcessToken } from "../../../../../utils/generateProcessToken";

const { eu, kr, tw, us } = battleNetRegions;

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

  const region = req.body?.region;

  const gameName = req.body?.game_name;
  if (!region) {
    return res.status(400).json({ errMsg: "Region is required" });
  } else if ((region === eu.value || kr.value, tw.value || us.value)) {
    if (gameName === "codWarzone") {
      // will be expired game name when added more game for battle net
      const state = processToken + " " + userId + " " + gameName;
      const battleNetAuthorizationUri = buildBattleNetAuthorizationUriBasedOnRegionAndState(
        region as string,
        state
      );
      return res.status(200).json({ Redirect: battleNetAuthorizationUri });
    } else {
      return res.status(400).json({
        errMsg: `${gameName} not valid`
      });
    }
  } else {
    return res.status(400).json({
      errMsg: `Invalid Region please be sure using one of ${eu.label} ${kr.label} ${tw.label} ${us.label}`
    });
  }
};

export default handler;

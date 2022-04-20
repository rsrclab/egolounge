import axios from "axios";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import {
  battleNetBase64FormatAuthorizationHeaderKey,
  battleNetCallBackUrl,
  battleNetClientId,
  battleNetClientSecret,
  battleNetRegions,
  getBattleNetTokenUrlBasedOnRegionAndState,
  getBattleNetUriRegionBase
} from "~/data";
import { updateUser } from "../../../../../lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;

  const state = query.state as string;
  const splittedState = state.split(" ");
  const processToken = splittedState[0];
  const userId = splittedState[1];
  const gameName = splittedState[2];
  const region = splittedState[3];
  const code = req.query.code;

  try {
    jwt.verify(processToken as string, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "");
  } catch (e) {
    return res.status(400).send("Process is expired please try again...");
  }
  if (
    processToken.length < 0 ||
    userId.length < 0 ||
    gameName.length < 0 ||
    region.length < 0 ||
    code.length < 0
  ) {
    return res.redirect("/");
  }

  if (gameName === "codWarzone") {
    const battleNetAccessTokenResponse = await getBattleNetAccessToken(region, code as string, res);
    const battleNetAccessToken = battleNetAccessTokenResponse as string;
    const battleNetUserDetailsResponse = await getBattleNetUserDetails(
      region,
      battleNetAccessToken,
      res
    );
    const { battleNetId, battleNetTag } = battleNetUserDetailsResponse as {
      battleNetId: string;
      battleNetTag: string;
    };
    await saveLinkGameForUser(userId, gameName, { battleNetId, battleNetTag }, res);
  } else {
    res.status(400).send(`Game name ${gameName} is not valid`);
  }
};

const getBattleNetAccessToken = async (region: string, code: string, res: NextApiResponse) => {
  const battleNetRequestParams = new URLSearchParams({
    code: code as string,
    client_id: battleNetClientId,
    client_secret: battleNetClientSecret,
    region: region,
    grant_type: "authorization_code",
    redirect_uri: battleNetCallBackUrl
  });
  const battleNetTokenUri = getBattleNetTokenUrlBasedOnRegionAndState(region);
  try {
    const battleNetTokenResponse = await axios.post(battleNetTokenUri, battleNetRequestParams, {
      headers: { Authorization: `Basic ${battleNetBase64FormatAuthorizationHeaderKey}` }
    });
    const accessToken = battleNetTokenResponse.data.access_token;
    return accessToken as string;
  } catch (e: any) {
    // console.log(e);
    if (e.response?.status === 401) {
      console.log(e.response);
      if (
        e.response.data.error_description ===
        "An Authentication object was not found in the SecurityContext"
      ) {
        return res.send(
          `Please be sure your region '${battleNetRegions[region].label}' is true and try again...`
        );
      }
      return res.send(e.response.data.error_description);
    }
    return res.send(e);
  }
};

const getBattleNetUserDetails = async (
  region: string,
  access_token: string,
  res: NextApiResponse
) => {
  const battleNetUserParams = new URLSearchParams({
    region: region,
    access_token
  });
  try {
    const battleNetUserInfo = await axios.get(
      `${getBattleNetUriRegionBase(region)}/oauth/userinfo`,
      {
        params: battleNetUserParams
      }
    );
    return {
      battleNetId: battleNetUserInfo.data.id as string,
      battleNetTag: battleNetUserInfo.data.battletag as string
    };
  } catch (e) {
    return res.send(e);
  }
};

const saveLinkGameForUser = async (
  userId: string,
  gameName: string,
  battleNetInfo: { battleNetId: string; battleNetTag: string },
  res: NextApiResponse
) => {
  try {
    await updateUser(userId, {
      gameAccounts: {
        [gameName]: {
          battleNetData: { ...battleNetInfo }
        }
      }
    });
    return res.redirect("/competitor");
  } catch (e) {
    return res.send(e);
  }
};
export default handler;

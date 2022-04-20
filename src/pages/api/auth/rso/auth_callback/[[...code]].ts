import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { updateUser } from "../../../../../lib";
import { adminAuth } from "../../../../../lib/firebase/adminInit";
import axios from "axios";
import {
  buildRsoSummonerV4BasedOnRegionViaUsername,
  buildRsoSummonerV4UriBasedOnRegion,
  RsoAccountMeI,
  rsoBasicAuth,
  rsoCallBackUrl,
  rsoMeUri,
  RsoRegionInfoI,
  rsoRegions,
  RsoSummonerRegions,
  RsoSummonerV4I,
  rsoTokenUri,
  rsoUserInfoUri
} from "../../../../../data/gamePlatformApis/rsoConfig";
import qs from "qs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const code = query.code;
  const state = query.state as string;
  const processToken = state.split(" ")[0];
  const userAccessToken = state.split(" ")[1];
  const gameName = state.split(" ")[2];
  const region = state.split(" ")[3];
  const continent = state.split(" ")[state.split(" ").length - 1];

  if (!code) return res.status(400).send("Code is required");
  if (!processToken) return res.status(400).send("Process token is required");
  if (!gameName) return res.status(400).send("Game name is required");
  if (!continent) return res.status(400).send("Continent is required");
  if (gameName !== "valorant" && gameName !== "leagueOfLegends")
    return res.status(400).send(`Game name is not valid ${gameName}`); // will add more game here when available
  if (!userAccessToken) return res.status(400).send("User token is required");

  // check for is process still valid
  try {
    jwt.verify(processToken, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "");
  } catch (e) {
    return res.status(400).send("It seems process time is expired please try again...");
  }

  // check for is user token is still valid
  let userUid: string;
  try {
    const { uid } = await adminAuth.verifyIdToken(userAccessToken);
    userUid = uid;
  } catch (e) {
    return res.status(400).send("User token not seem valid");
  }

  // rso access token call
  const rsoAccessTokenResponse = await getRsoAccessToken(code as string, res);
  if (!rsoAccessTokenResponse) return;

  // rso account me call
  if (gameName === "valorant") {
    const getRsoUserInfoResponse = await getRsoAccountMe(
      rsoAccessTokenResponse.rso_access_token,
      res
    );
    if (!getRsoUserInfoResponse) return;

    // save user info into firebase firestore
    await saveLinkGameForUser(userUid, gameName, { ...getRsoUserInfoResponse, continent }, res);
  }
  if (gameName === "leagueOfLegends") {
    //TODO instead getting region from user,get it by call
    // const userRegionResponse = await getRegionForUser(rsoAccessTokenResponse.rso_access_token, res);
    // if (!userRegionResponse) return;
    // const userRegion = userRegionResponse.cpid.toLowerCase() as RsoSummonerRegions;
    if (!region) return res.status(400).send("Region is required");
    const currentRegion = region as RsoSummonerRegions;
    const isRegionValid = rsoRegions.some(region => region === currentRegion);

    if (isRegionValid) {
      const rsoSummonerV4Response = await getRsoSummonerV4(
        currentRegion,
        rsoAccessTokenResponse.rso_access_token,
        res
      );
      if (!rsoSummonerV4Response) return;
      const rsoSummonerV4ResponseViaName = await getRsoSummonerV4ViaUsername(
        currentRegion,
        rsoSummonerV4Response.name,
        res
      );
      if (!rsoSummonerV4ResponseViaName) return;

      await saveLinkGameForUser(
        userUid,
        gameName,
        { ...rsoSummonerV4ResponseViaName, region, continent },
        res
      );
    } else {
      return res.status(400).send(`Region '${region}' not seem valid please try again...`);
    }
  }
};
export default handler;

// this is enough to get valorant && legends of Runeterra infos
const getRsoAccountMe = async (access_token: string, res: NextApiResponse) => {
  try {
    const userInfoResponse = await axios.get(rsoMeUri, {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    return userInfoResponse.data as RsoAccountMeI;
  } catch (e: any) {
    res
      .status(400)
      .send(
        `accessToken : ${access_token} error: ${e.response.data.status.message} status : ${e.response.data.status.status_code}`
      );
    return;
  }
};

//this is to get leagueof legends infos

const getRsoSummonerV4 = async (
  region: RsoSummonerRegions,
  rso_access_token: string,
  res: NextApiResponse
) => {
  try {
    const summonerV4Uri = buildRsoSummonerV4UriBasedOnRegion(region);
    const rsoSummonerV4 = await axios.get(summonerV4Uri, {
      headers: { Authorization: `Bearer ${rso_access_token}` }
    });
    return rsoSummonerV4.data as RsoSummonerV4I;
  } catch (e: any) {
    if (e.response.data.status.status_code === 404) {
      res
        .status(404)
        .send(`It seems user not found. Please be sure region: '${region}' is correct...`);
    } else {
      res
        .status(500)
        .send(`${e.response.data.status.message} status : ${e.response.data.status.status_code}`);
    }
    return;
  }
};

const getRsoSummonerV4ViaUsername = async (
  region: RsoSummonerRegions,
  summonerName: string,
  res: NextApiResponse
) => {
  try {
    const summonerV4Uri = buildRsoSummonerV4BasedOnRegionViaUsername(region, summonerName);
    const rsoSummonerV4 = await axios.get(summonerV4Uri, {
      headers: { "X-Riot-Token": process.env.RIOT_GAMES_DEV_API_KEY ?? "" }
    });
    return rsoSummonerV4.data as RsoSummonerV4I;
  } catch (e: any) {
    console.log(e);
    if (e.response.data.status.status_code === 404) {
      res
        .status(404)
        .send(`It seems user not found. Please be sure region: '${region}' is correct...`);
    } else {
      res
        .status(500)
        .send(`${e.response.data.status.message} status : ${e.response.data.status.status_code}`);
    }
    return;
  }
};

const getRsoAccessToken = async (code: string, res: NextApiResponse) => {
  const params = qs.stringify({
    grant_type: "authorization_code",
    code: code as string,
    redirect_uri: rsoCallBackUrl
  });

  try {
    const rsoAccessTokenResponse = await axios.post(rsoTokenUri, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${rsoBasicAuth}`
      }
    });

    return {
      rso_access_token: rsoAccessTokenResponse.data.access_token as string,
      rso_refresh_token: rsoAccessTokenResponse.data.refresh_token as string
    };
  } catch (e: any) {
    if (e.response.status === 400) {
      res.status(400).send("It seems process is expired already please try again...");
    } else {
      res.status(501).send(e.response.data.error_description);
    }
    return;
  }
};

const saveLinkGameForUser = async (
  userId: string,
  gameName: string,
  riotInfo: any,
  res: NextApiResponse
) => {
  try {
    await updateUser(userId, {
      gameAccounts: {
        [gameName]: {
          riotData: { ...riotInfo }
        }
      }
    });
    return res.redirect("/competitor");
  } catch (e) {
    return res.send(e);
  }
};
// const getExtendedScopeTokenForRegion = async (refresh_token: string, res: NextApiResponse) => {
//   const params = qs.stringify({
//     grant_type: "refresh_token",
//     refresh_token,
//     redirect_uri: rsoCallBackUrl
//   });

//   try {
//     const rsoAccessTokenThatExtendedByRegionResponse = await axios.post(rsoTokenUri, params, {
//       headers: {
//         Authorization: `Basic ${rsoBasicAuth}`
//       }
//     });

//     return rsoAccessTokenThatExtendedByRegionResponse.data.access_token as string;
//   } catch (e) {
//     res.status(501).send(e);
//     return;
//   }
// };

// this is get region for user
const getRegionForUser = async (rso_access_token: string, res: NextApiResponse) => {
  try {
    const userRegionInfo = await axios.get(rsoUserInfoUri, {
      headers: { Authorization: `Bearer ${rso_access_token}` }
    });
    console.log(userRegionInfo);
    return userRegionInfo.data as RsoRegionInfoI;
  } catch (e: any) {
    res
      .status(400)
      .send(
        `accessToken : ${rso_access_token} error: ${e.response.data.status.message} status : ${e.response.data.status.status_code}`
      );
    return;
  }
};

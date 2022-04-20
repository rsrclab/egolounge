import { baseURL } from "../../lib";
import { isDevMode } from "../../utils";

const battleNetAccessTokenCookieName = "battle-net-game-auth-token";
const battleNetRefreshTokenCookieName = "battle-net-game-auth-refresh-token";
const battleNetAccountIdCookieName = "battle-net-game-account-id-cookie-name";
//battlenet Regions
const battleNetRegions = {
  us: { value: "us", label: "Americas" },
  eu: { value: "eu", label: "Europe" },
  tw: { value: "tw", label: "Asia" },
  kr: { value: "kr", label: "South Korea" }
};

//battleNet Client Credentials
const battleNetClientId = process.env.BATTLE_NET_ID ?? "";
const battleNetClientSecret = process.env.BATTLE_NET_SECRET ?? "";
const battleNetBase64FormatAuthorizationHeaderKey = Buffer.from(
  `${battleNetClientId}:${battleNetClientSecret}`
).toString("base64");

// Local endpoints
const battleNetAuthFlowApiBase = "/api/auth/battleNet";

const battleNetAuthFlowEndPoints = {
  login: battleNetAuthFlowApiBase + "/login/",
  logout: battleNetAuthFlowApiBase + "/logout",
  isvalid: battleNetAuthFlowApiBase + "/isvalid",
  callback: battleNetAuthFlowApiBase + "/auth_callback/"
};

const battleNetCallBackUrl = isDevMode
  ? baseURL + battleNetAuthFlowEndPoints.callback
  : `https://egolounge.com${battleNetAuthFlowEndPoints.callback}`;

// Require Uri to call Battle.net
const getBattleNetUriRegionBase = (region: string) => {
  return `https://${region}.battle.net`;
};

const getBattleNetTokenUrlBasedOnRegionAndState = (region: string) => {
  return `${getBattleNetUriRegionBase(region)}/oauth/token`;
};

const buildBattleNetAuthorizationUriBasedOnRegionAndState = (region: string, state: string) => {
  return `${getBattleNetUriRegionBase(
    region
  )}/oauth/authorize?response_type=code&client_id=${battleNetClientId}&state=${
    state + " " + region
  }&redirect_uri=${battleNetCallBackUrl}`;
};
// const buildBattleNetCredentials = (region: string, state: string) => {
//   const credentials = Object.freeze({
//     authorizationURL: `${b(region,state)}`,
//     tokenURL: `${getBattleNetTokenUrlBasedOnRegion(region)}`,
//     clientID: battleNetClientId,
//     clientSecret: battleNetClientSecret,
//     callbackURL: battleNetCallBackUrl,
//     state
//   });
//   return credentials;
// };

export {
  battleNetBase64FormatAuthorizationHeaderKey,
  battleNetAuthFlowEndPoints,
  battleNetAccessTokenCookieName,
  battleNetRefreshTokenCookieName,
  battleNetAccountIdCookieName,
  getBattleNetUriRegionBase,
  battleNetRegions,
  buildBattleNetAuthorizationUriBasedOnRegionAndState,
  getBattleNetTokenUrlBasedOnRegionAndState,
  battleNetClientId,
  battleNetClientSecret,
  battleNetCallBackUrl
};

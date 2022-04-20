import { baseURL } from "../../lib";
import { isDevMode } from "../../utils";

const epicGameAccessTokenCookieName = "epic-game-auth-token";
const epicGameRefreshTokenCookieName = "epic-game-auth-refresh-token";
const epicGameAccountIdCookieName = "epic-game-account-id-cookie-name";

const epicGameClientId = process.env.EPICGAME_CLIENT_ID as string;
const epicGameClientSecret = process.env.EPICGAME_CLIENT_SECRET_KEY as string;

const epicGameBase64FormatAuthorizationHeaderKey = Buffer.from(
  `${epicGameClientId}:${epicGameClientSecret}`
).toString("base64");

const epicGameAuthFlowApiBase = "/api/auth/epicgame";

const epicGameAuthFlowEndPoints = {
  login: epicGameAuthFlowApiBase + "/login",
  isvalid: epicGameAuthFlowApiBase + "/isvalid",
  callback: epicGameAuthFlowApiBase + "/auth_callback/"
};

const epicGameCallBackUrl = isDevMode
  ? baseURL + epicGameAuthFlowEndPoints.callback
  : `https://egolounge.com${epicGameAuthFlowEndPoints.callback}`;

// const epicGameScopes = ["basic_profile", "friend_list", "presence"].join(" ");
const epicGameScopes = "basic_profile friends_list presence";
const epicGameTokenUri = "https://api.epicgames.dev/epic/oauth/v1/token";

const buildEpicGameAuthorizationUri = (state: string) => {
  const epicGameUri = `https://www.epicgames.com/id/authorize?client_id=${epicGameClientId}&redirect_uri=${epicGameCallBackUrl}&response_type=code&state=${state}`;
  return epicGameUri;
};

// const epicGameCredentials = Object.freeze({
//   authorizationURL: "https://www.epicgames.com/id/authorize",
//   tokenURL: "https://api.epicgames.dev/epic/oauth/v1/token",
//   clientID: epicGameClientId,
//   clientSecret: epicGameClientSecret,
//   callbackURL: epicGameCallBackUrl
// });

export {
  // epicGameCredentials,
  epicGameBase64FormatAuthorizationHeaderKey,
  epicGameAuthFlowEndPoints,
  epicGameAccessTokenCookieName,
  epicGameRefreshTokenCookieName,
  epicGameAccountIdCookieName,
  buildEpicGameAuthorizationUri,
  epicGameTokenUri,
  epicGameClientId,
  epicGameClientSecret
  // epicGameNgrokTunnelServerUrl
};

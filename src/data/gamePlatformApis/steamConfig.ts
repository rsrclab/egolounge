import { baseURL } from "../../lib";
import { isDevMode } from "../../utils";

const providerURL = "http://steamcommunity.com/openid/login?";
const steamAuthFlowApiBase = "api/auth/steam/connect/";
const steamEndPoints = {
  login: steamAuthFlowApiBase,
  connect: steamAuthFlowApiBase
};

const mode = "checkid_setup";
const steamReturnUrl = isDevMode
  ? `${baseURL}/api/auth/steam/auth/`
  : `https://egolounge.com/api/auth/steam/auth/`;
const steamRealmUrl = isDevMode ? baseURL + "/" : "https://egolounge.com/";
const steamApiKey = process.env.STEAM_DEV_API_KEY;
const steamIdCookieName = "steam-id";
const buildSteamReturnUrl = ({
  processToken,
  processType,
  isLinkGame,
  gameName,
  userToken
}: {
  processToken: string;
  processType: string;
  isLinkGame: boolean;
  gameName?: string;
  userToken?: string;
}) => {
  const returnUrl = isLinkGame
    ? `${steamReturnUrl}?state=${
        processToken + " " + gameName + " " + userToken + " " + processType
      }`
    : `${steamReturnUrl}?process_token=${processToken + " " + processType}`;
  return returnUrl;
};
const buildSteamAuthorizationUrl = (returnUrl: string) => {
  const steamAuthorizationUri = `https://steamcommunity.com/openid/login?openid.mode=${mode}&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.return_to=${returnUrl}&openid.realm=${steamRealmUrl}`;
  return steamAuthorizationUri;
};

const steamApiCredentials = {
  providerURL,
  stateless: true,
  nonce: "123456",
  returnURL: steamReturnUrl,
  realm: steamRealmUrl,
  apiKey: steamApiKey,
  mode: "checkid_setup",
  state: "123456"
  // How the OpenID provider should return the client to us
};

const steamGameCodes = {
  csgo: { code: "730", gameText: "csgo" },
  dota: { code: "570", gameText: "dota" },
  teamFortress2: { code: "440", gameText: "ts2" },
  left4Dead2: { code: "550", gameText: "left4Dead2" }
};

export {
  steamEndPoints,
  steamApiKey,
  steamApiCredentials,
  steamIdCookieName,
  buildSteamAuthorizationUrl,
  buildSteamReturnUrl,
  steamGameCodes
};

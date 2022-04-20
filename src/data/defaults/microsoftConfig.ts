import qs from "qs";
import { isDevMode } from "../../utils";

const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;
const MICROSOFT_REDIRECT_URI = isDevMode
  ? "http://localhost:3000/api/auth/microsoft/auth_callback/"
  : "https://egolounge.com/api/auth/microsoft/auth_callback/";
const MICROSOFT_READ_PROFILE_URI = "https://graph.microsoft.com/v1.0/me";

const MICROSOFT_ACCESS_TOKEN_URI = "https://login.live.com/oauth20_token.srf";
const MICROSOFT_XBOX_TOKEN_URI = "https://user.auth.xboxlive.com/user/authenticate";
const MICROSOFT_XBOX_XSTS_TOKEN_URI = "https://xsts.auth.xboxlive.com/xsts/authorize";

const MICROSOFT_SCOPES = (isIncludeXboxScopes: boolean) => {
  return isIncludeXboxScopes ? ["xboxlive.signin"].join(" ") : ["User.Read"].join(" ");
};

const buildMicrosoftAuthorizeUri = (
  { isIncludeXboxScopes }: { isIncludeXboxScopes: boolean },
  sessionState?: string
) => {
  const scopes = MICROSOFT_SCOPES(isIncludeXboxScopes);
  const MICROSOFT_AUTHENTICATION_URI = `https://login.live.com/oauth20_authorize.srf?client_id=${MICROSOFT_CLIENT_ID}&response_type=code&redirect_uri=${MICROSOFT_REDIRECT_URI}&response_mode=query&scope=${scopes}&state=${sessionState}&prompt=select_account`;
  return MICROSOFT_AUTHENTICATION_URI;
};

const getMicrosoftAccessTokenParams = (code: string, isXboxScopesRequired: boolean) => {
  return qs.stringify({
    client_id: MICROSOFT_CLIENT_ID,
    scope: MICROSOFT_SCOPES(isXboxScopesRequired),
    redirect_uri: MICROSOFT_REDIRECT_URI,
    grant_type: "authorization_code",
    client_secret: MICROSOFT_CLIENT_SECRET,
    code
  });
};

export {
  buildMicrosoftAuthorizeUri,
  MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET,
  MICROSOFT_REDIRECT_URI,
  MICROSOFT_ACCESS_TOKEN_URI,
  MICROSOFT_XBOX_TOKEN_URI,
  MICROSOFT_XBOX_XSTS_TOKEN_URI,
  MICROSOFT_SCOPES,
  MICROSOFT_READ_PROFILE_URI,
  getMicrosoftAccessTokenParams
};

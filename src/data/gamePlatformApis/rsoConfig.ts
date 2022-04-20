import { isDevMode } from "../../utils";

//  following interfaces and types according to
//  https://developer.riotgames.com/apis#account-v1/GET_getByAccessToken
//  https://developer.riotgames.com/apis#summoner-v4/GET_getByAccessToken

export interface RsoAccountMeI {
  puuid: string;
  gameName?: string;
  tagLine?: string;
}
export interface RsoSummonerV4I {
  accountId: string;
  profileIconId: number;
  revisionDate: number;
  name: string;
  id: string;
  puuid: string;
  summonerLevel: number;
}

export type RsoSummonerRegions =
  | "br1"
  | "eun1"
  | "euw1"
  | "jp1"
  | "kr"
  | "la1"
  | "la2"
  | "na1"
  | "oc1"
  | "ru"
  | "tr1";

export interface RsoRegionInfoI {
  sub: string;
  cpid: RsoSummonerRegions;
}

const rsoRegions: RsoSummonerRegions[] = [
  "br1",
  "eun1",
  "euw1",
  "jp1",
  "kr",
  "la1",
  "la2",
  "na1",
  "oc1",
  "oc1",
  "ru",
  "tr1"
];

const rsoBasicAuth = Buffer.from(
  `${process.env.RIOT_GAMES_CLIENT_ID}:${process.env.RIOT_GAMES_CLIENT_SECRET}`
).toString("base64");

const rsoCallBackUrl = isDevMode
  ? "http://local.safe.egolounge.com/api/auth/rso/auth_callback/"
  : "https://egolounge.com/api/auth/rso/auth_callback/";

const rsoMeUri = `https://europe.api.riotgames.com/riot/account/v1/accounts/me`;
const rsoProviderUri = "https://auth.riotgames.com";
const rsoAuthorizeProviderUri = `${rsoProviderUri}/authorize?`;
const rsoTokenUri = `${rsoProviderUri}/token`;
const rsoUserInfoUri = `${rsoProviderUri}/userinfo`;
const rsoLogoutUri = `${rsoProviderUri}/logout`;

const rsoScopes = ["cpid", "openid", "offline_access"].join(" ");

const buildRsoAuthorizeUri = (state: string) => {
  return `${rsoAuthorizeProviderUri}client_id=${process.env.RIOT_GAMES_CLIENT_ID}&redirect_uri=${rsoCallBackUrl}&response_type=code&scope=${rsoScopes}&state=${state}`;
};
const buildRsoSummonerV4UriBasedOnRegion = (region: RsoSummonerRegions) => {
  const uri = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/me`;
  return uri;
};
const buildRsoSummonerV4BasedOnRegionViaUsername = (
  region: RsoSummonerRegions,
  summonerName: string
) => {
  const uri = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
  return uri;
};

export {
  buildRsoAuthorizeUri,
  rsoTokenUri,
  rsoCallBackUrl,
  rsoBasicAuth,
  rsoUserInfoUri,
  rsoMeUri,
  buildRsoSummonerV4UriBasedOnRegion,
  buildRsoSummonerV4BasedOnRegionViaUsername,
  rsoScopes,
  rsoRegions,
  rsoLogoutUri
};

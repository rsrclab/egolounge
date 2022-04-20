import { baseURL } from "../../lib";
import { isDevMode } from "../../utils";

const scopes = ["identify", "email", "guilds.join", "guilds"].join(" ");
const baseURI = isDevMode ? baseURL : "https://egolounge.com";
const discordClientId = process.env.DISCORD_CLIENT_ID ?? "";
const discordClientSecret = process.env.DISCORD_CLIENT_SECRET ?? "" ?? "";
const callBackURI = `${baseURI}/api/auth/discord/auth_callback/`;

const buildDiscordAuthorizationUri = (processToken: string) => {
  const discordAuthorizationLink = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${discordClientId}&scope=${scopes}&state=${processToken}&redirect_uri=${callBackURI}&prompt=consent`;
  return discordAuthorizationLink;
};

export { buildDiscordAuthorizationUri, callBackURI, scopes, discordClientId, discordClientSecret };

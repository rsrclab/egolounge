import axios from "axios";
import { setCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import {
  callBackURI,
  discordClientId,
  discordClientSecret
} from "../../../../../data/defaults/discordConfig";
import jwt from "jsonwebtoken";
import { createUser } from "../../../../../lib/firebase";
import { adminAuth } from "../../../../../lib/firebase/adminInit";

// According to https://discord.com/developers/docs/resources/user
interface DiscordUserDetailsI {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  verified: boolean;
  email: string;
  flags: number;
  banner: string;
  accent_color: number;
  premium_type: number;
  public_flags: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;
  if (!code) return res.redirect("/");

  try {
    jwt.verify(state as string, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "");
  } catch (e) {
    return res.status(403).send("Process expired please try again");
  }

  const discordAccessTokenResponse = await getDiscordAccessToken(code as string, res);
  const { discord_access_token } = discordAccessTokenResponse as {
    discord_access_token: string;
  };
  const getDiscordUserDetailsResponse = await getDiscordUserDetails(discord_access_token, res);
  const { id, username, email } = getDiscordUserDetailsResponse as DiscordUserDetailsI;
  const discordUser = {
    uid: id,
    username,
    email
  };
  await handleLoginByDiscord(discordUser, req, res);
};
const getDiscordAccessToken = async (code: string, res: NextApiResponse) => {
  const params = new URLSearchParams({
    client_id: discordClientId ?? " ",
    client_secret: discordClientSecret ?? " ",
    grant_type: "authorization_code",
    code: code as string,
    redirect_uri: callBackURI
  });
  try {
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };
    const discordAccessTokenResponse = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      {
        headers
      }
    );
    return { discord_access_token: discordAccessTokenResponse.data.access_token as string };
  } catch (e) {
    return res.send(e);
  }
};
const getDiscordUserDetails = async (discordAccessToken: string, res: NextApiResponse) => {
  try {
    const discordUserMeResponse = await axios.get(`https://discordapp.com/api/v6/users/@me`, {
      headers: {
        Authorization: `Bearer ${discordAccessToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return discordUserMeResponse.data as DiscordUserDetailsI;
  } catch (e) {
    return res.send(e);
  }
};

const handleLoginByDiscord = async (
  discordUser: {
    uid: string;
    username: string;
    email: string;
  },
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userRecord = await adminAuth.getUserByEmail(discordUser.email);
    const createdTokenByFirebase = await adminAuth.createCustomToken(userRecord.uid);
    setCookies("custom-token", createdTokenByFirebase, { req, res });
  } catch (e) {
    const newUser = await adminAuth.createUser({ ...discordUser });
    await createUser(newUser.uid, {
      email: discordUser.email,
      username: discordUser.username
    });
    const createdTokenByFirebase = await adminAuth.createCustomToken(newUser.uid);
    setCookies("custom-token", createdTokenByFirebase, { req, res });
  }
  return res.redirect("/");
};

export default handler;

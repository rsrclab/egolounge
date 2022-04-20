import { NextApiRequest, NextApiResponse } from "next";
import { baseURL } from "../../../../lib";

export const twitchOauth2BaseUri = "https://id.twitch.tv/oauth2/authorize";
export const twitchCredentials = {
  client_id: process.env.TWITCH_CLIENT_ID,
  redirect_uri: baseURL + "/api/auth/twitch/auth_callback/",
  response_type: "code",
  scope: "user:edit user:read:email",
  state: "keytopreventcsrtftoken"
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.redirect(
      `${twitchOauth2BaseUri}?client_id=${twitchCredentials.client_id}&redirect_uri=${twitchCredentials.redirect_uri}&response_type=${twitchCredentials.response_type}&scope=${twitchCredentials.scope}`
    );
  } else {
    res.send("method not founded");
  }
};
export default handler;

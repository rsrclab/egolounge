import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

//TODO Twitch API V5 depreciated so will update here when the migration done with latest versin and integrate with twitch login.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { code } = req.query;
    if (!code) return res.redirect("/");
    const accesTokenURI = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_TWITCH_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/api/auth/twitch/auth_callback/`;

    const getUserURI = `https://api.twitch.tv/kraken/user`;
    try {
      const tokenResponse = await axios.post(accesTokenURI);
      console.log(tokenResponse.data);

      const getUserHeader = {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": `${process.env.TWITCH_CLIENT_ID}`,
        Authorization: `Bearer ${tokenResponse.data.access_token}`
      };

      const twitchUserInfoResponse = await axios.get(getUserURI, { headers: getUserHeader });
      console.log(twitchUserInfoResponse.data);
    } catch (e) {
      // console.log(e);
      return res.redirect("/");
    }
    // console.log("reqquery", tokenResponse);
    return res.redirect("/");
  } else {
    return res.redirect("/");
  }
};
export default handler;

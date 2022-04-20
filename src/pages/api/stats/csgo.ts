import axios from "axios";
import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { steamApiKey, steamIdCookieName } from "~/data";
import { updateUser } from "~/lib";

const nc = nextConnect<NextApiRequest, NextApiResponse>();
nc.use(cors());
export default nc.post(async (req, res) => {
  const { userId, gameName, steamId } = req.body;

  if (userId.length <= 0) return res.status(400).json({ userIdNotFound: true });
  if (gameName.length <= 0) return res.status(400).json({ gameNameNotFound: true });
  if (steamId.length <= 0) return res.status(400).json({ steamIdNotFound: true });

  try {
    const resUri = `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${steamApiKey}&steamid=${steamId}`;
    const gameUserData = await axios.get(resUri);

    // this can handle, CSGO, PUBG, Dota 2

    //TODO csgo stats data will save db here.
    // const newUserData = {
    //   gameAccounts: {
    //     [gameName]: {
    //       ...gameUserData.data
    //     }
    //   }
    // };
    // await updateUser(userId, newUserData);

    return res.status(200).send(gameUserData);
  } catch (e: any) {
    return res.status(400).json({ success: false });
  }
});

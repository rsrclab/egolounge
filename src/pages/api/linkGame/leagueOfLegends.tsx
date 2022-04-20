import axios from "axios";
import { NextApiHandler } from "next";
import { updateUser } from "~/lib";

export const handler: NextApiHandler = async (req, res) => {
  const { userId, continent, region, username } = req.body;

  try {
    if (req.method === "POST") {
      if (
        userId?.length > 0 &&
        continent?.length > 0 &&
        region?.length > 0 &&
        username?.length > 0
      ) {
        const lolUserData = await axios.get(
          `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.RIOT_GAMES_DEV_API_KEY}`
        );

        const newUserData = {
          gameAccounts: {
            leagueOfLegends: {
              continent: continent,
              region: region,
              ...lolUserData.data
            }
          }
        };

        await updateUser(userId, newUserData);
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({
          success: false,
          error: "Userid, continent, region and username must be supplied"
        });
      }
    } else {
      res.status(404).json({ success: false, error: "Method not allowed" });
    }
  } catch (e) {
    if ((e as any)?.response?.statusText === "Not Found") {
      res
        .status(404)
        .json({ success: false, error: `User with username ${username} was not found!` });
    } else if ((e as any)?.response?.status === 403) {
      res.status(403).json({ success: false, error: "API KEY" });
    } else {
      res.status(404).json({ success: false, error: "Unknown error" });
    }
  }
};

export default handler;

// 328

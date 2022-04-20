import axios from "axios";
import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { updateUser } from "~/lib";

const nc = nextConnect<NextApiRequest, NextApiResponse>();
nc.use(cors());
export default nc.post(async (req, res) => {
  const { steamName, userId } = req.body;

  // if (userId.length <= 0) return res.status(400).json({ userIdNotFound: true });
  if (!steamName) return res.status(400).json({ userNotLinkedSteam: true });

  try {
    const getPubgUserIdBySteamNameURI = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${steamName}`;
    const pubgData = await axios.get(getPubgUserIdBySteamNameURI, {
      headers: {
        Authorization: `Bearer ${process.env.PUBG_API_KEY}`,
        accept: "application/vnd.api+json"
      }
    });
    const pubgAccoundId = pubgData.data.data[0].id;
    const getLifeTimePubgStatsURI = `https://api.pubg.com/shards/steam/players/${pubgAccoundId}/seasons/lifetime?filter[gamepad]=false`;

    const pubgLifeTimeStats = await axios.get(getLifeTimePubgStatsURI, {
      headers: {
        Authorization: `Bearer ${process.env.PUBG_API_KEY}`,
        accept: "application/vnd.api+json"
      }
    });

    // TODO pubg stats data will save db here.
    // const newUserData = {
    //   gameAccounts: {
    //     pubg: {
    //       ...pubgLifeTimeStats.data
    //     }
    //   }
    // };
    // await updateUser(userId, newUserData);

    return res.status(200).send(pubgLifeTimeStats.data);
  } catch (e: any) {
    console.log(e);
    res.send(JSON.stringify(e.data, null, 2));
  }
});

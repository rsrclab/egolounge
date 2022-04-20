import axios from "axios";
import cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { updateUser } from "../../../lib";

const nc = nextConnect<NextApiRequest, NextApiResponse>();
nc.use(cors());
export default nc.post(async (req, res) => {
  const { userId, epicGameId: epicAccountId } = req.body;

  if (!epicAccountId) return res.status(400).json({ epicGameAccountIdNotFound: true });
  if (userId.length <= 0) return res.status(400).json({ userIdNotFound: true });

  /*Offical fortnite stats uri and its requires
   const currentEpicGameToken = getCookie(epicGameAccessTokenCookieName, { req, res }) as string;
   const fortniteStatsURI = `https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/stats/accountId/${currentEpicGameAccountId}`;
  */

  const unOfficalFortniteStatsURI = `https://fortnite-api.com/v2/stats/br/v2/${epicAccountId}?image=all`;

  try {
    const fortniteStatsResponse = await axios.get(unOfficalFortniteStatsURI, {
      headers: {
        Authorization: process.env.FORTNITE_API_DEV_KEY ?? ""
      }
    });

    //TODO fortnite stats data will save db here.
    // const newUserData = {
    //   gameAccounts: {
    //     fortnite: {
    //       ...fortniteStatsResponse.data
    //     }
    //   }
    // };

    // await updateUser(userId, newUserData);

    res.status(200).send(fortniteStatsResponse.data);
  } catch (e: any) {
    res.send(JSON.stringify(e, null, 2));
  }
});

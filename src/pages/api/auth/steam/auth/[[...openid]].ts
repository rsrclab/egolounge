import axios from "axios";
import { setCookies } from "cookies-next";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { steamApiKey } from "~/data";
import { createUser, updateUser } from "~/lib";
import { adminAuth } from "../../../../../lib/firebase/adminInit";

const PUBG_API_KEY = process.env.PUBG_API_KEY;

const handler = nextConnect<NextApiRequest, NextApiResponse>();
export default handler.get(async (req, res) => {
  const steamIDUrl = req.query["openid.identity"] as string;
  const state = req.query["state"] as string | undefined;
  const processTokenQuery = req.query["process_token"] as string | undefined;
  const gameName = state?.split(" ")[1] ?? "";
  const clientToken = state?.split(" ")[2] ?? "";
  const processToken = state ? state?.split(" ")[0] : processTokenQuery?.split(" ")[0];
  const processType = state
    ? state.split(" ")[state.split(" ").length - 1]
    : processTokenQuery?.split(" ")[processTokenQuery.split(" ").length - 1];

  try {
    jwt.verify(processToken as string, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "");
  } catch (e) {
    return res.status(403).send("Process expired please try again");
  }
  if (!steamIDUrl) return res.redirect("/");

  const steamIDUrlSplitted = steamIDUrl.split("/");
  const steamID = steamIDUrlSplitted[steamIDUrlSplitted.length - 1];
  if (processType === "linkGame") {
    //steam link game process
    // Unsuccessful link game since game name not found via gameName, redirect home.
    // otherwise return competitor
    await handleGameLinkProcess(clientToken, gameName, steamID, res);
  } else if (processType === "login") {
    // steam login process
    await handleLoginProcess(steamID, req, res);
    // Successful login, redirect competitor.
  } else {
    return res.status(401).send("Process type not allowed");
  }
});

const getSteamPlayerSummaries = async (steamId: string) => {
  const steamGetPlayerSummariesUri = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamApiKey}&steamids=${steamId}`;
  try {
    const gameUserData = await axios.get(steamGetPlayerSummariesUri);
    return gameUserData.data.response.players[0];
  } catch (e: any) {
    if (e.response.status === 404) {
      return "User_Not_Found";
    }
  }
};

const linkPubg = async (steamPlayerData, res: NextApiResponse) => {
  const personaName = steamPlayerData.personaname;
  const pubgResUri = `https://api.pubg.com/shards/steam/players?filter[playerNames]=${personaName?.toLowerCase()}`;
  try {
    const pubgUserData = await axios.get(pubgResUri, {
      headers: {
        accept: "application/vnd.api+json",
        Authorization: `Bearer ${PUBG_API_KEY}`
      }
    });
    const pubgAccountId = pubgUserData.data.data[0].id;
    return pubgAccountId;
  } catch (e: any) {
    if (e.response.status === 404) {
      return res.status(400).json({ success: false, error: "Player Not Found" });
    }
  }
};

const saveLinkGameForUser = async (userId: string, gameName: string, platformData) => {
  const linkedGameDataForUser = {
    gameAccounts: {
      [gameName]: {
        steamData: { ...platformData }
      }
    }
  };
  await updateUser(userId, linkedGameDataForUser);
};
const handleLoginProcess = async (
  steamUserId: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userRecord = await adminAuth.getUser(steamUserId);
    const createdTokenByFirebase = await adminAuth.createCustomToken(userRecord.uid);
    setCookies("custom-token", createdTokenByFirebase, { req, res });
  } catch (e) {
    const newUser = await adminAuth.createUser({ uid: steamUserId });
    await createUser(newUser.uid, {
      username: steamUserId,
      email: ""
    });
    const createdTokenByFirebase = await adminAuth.createCustomToken(newUser.uid);
    setCookies("custom-token", createdTokenByFirebase, { req, res });
  }
  return res.redirect("/");
};
const handleGameLinkProcess = async (
  clientToken: string,
  gameName: string,
  steamId: string,
  res: NextApiResponse
) => {
  if (!clientToken) {
    return res.status(400).send(`User token required to link account with ${gameName}`);
  }
  if (gameName === "csgo" || "pubg" || "dota") {
    try {
      const decodedFirebaseUser = await adminAuth.verifyIdToken(clientToken);
      const userId = decodedFirebaseUser.uid;
      const steamPlayerData = await getSteamPlayerSummaries(steamId);
      if ((gameName === "csgo" || "dota") && steamPlayerData !== "User_Not_Found") {
        await saveLinkGameForUser(userId, gameName, steamPlayerData);
      }
      if (gameName === "pubg" && steamPlayerData !== "User_Not_Found") {
        const pubgId = await linkPubg(steamPlayerData, res);
        await saveLinkGameForUser(userId, gameName, { ...steamPlayerData, pubgId });
      }
      if (steamPlayerData === "User_Not_Found") {
        // Unsuccessful link game because steam user not found via id, redirect home.
        return res.redirect("/");
      }

      // Successful link game, redirect competitor.
      return res.redirect("/competitor");
    } catch (e) {
      return res.status(400).send("User Token Not valid");
    }
  } else {
    return res.status(400).send(`Game name :${gameName} is not valid`);
  }
};

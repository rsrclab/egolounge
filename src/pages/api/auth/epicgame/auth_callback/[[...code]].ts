import axios from "axios";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import {
  epicGameBase64FormatAuthorizationHeaderKey,
  epicGameClientId,
  epicGameClientSecret,
  epicGameTokenUri
} from "~/data";
import { updateUser } from "~/lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code, state } = req.query;
  const splittedState = (state as string).split(" ");
  const processToken = splittedState[0];
  const userId = splittedState[1];
  const gameName = splittedState[2];

  try {
    jwt.verify(processToken as string, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "");
  } catch (e) {
    return res.status(400).send("Process is expired please try again...");
  }

  if (processToken.length < 0 || userId.length < 0 || gameName.length < 0 || code.length < 0) {
    return res.redirect("/");
  }
  if (gameName === "fortnite") {
    const epicGameDataResponse = await getEpicGameToken(code as string, res);
    // if (!epicGameDataResponse) return;
    await saveLinkGameForUser(userId, gameName, epicGameDataResponse, res);
  } else {
    return res.status(400).send(`Game name ${gameName} is not valid`);
  }
};

const getEpicGameToken = async (code: string, res: NextApiResponse) => {
  const epicGameRequestParams = new URLSearchParams({
    code: code as string,
    client_id: epicGameClientId,
    client_secret: epicGameClientSecret,
    scope: "basic_profile friends_list presence",
    grant_type: "authorization_code"
  });

  try {
    const epicGameTokenResponse = await axios.post(epicGameTokenUri, epicGameRequestParams, {
      headers: {
        Authorization: `Basic ${epicGameBase64FormatAuthorizationHeaderKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return epicGameTokenResponse.data;
  } catch (e: any) {
    res.status(400).send(e.response.data.error_description);
    return null;
  }
};

const saveLinkGameForUser = async (
  userId: string,
  gameName: string,
  epicGameData: any,
  res: NextApiResponse
) => {
  if (!epicGameData) return;
  try {
    const newUserData = {
      gameAccounts: {
        [gameName]: {
          epicGameData
        }
      }
    };

    await updateUser(userId, newUserData);
    return res.redirect("/competitor");
  } catch (e) {
    return res.send(e);
  }
};
export default handler;

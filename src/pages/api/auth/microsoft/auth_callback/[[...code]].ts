import axios from "axios";
import { setCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser, updateUser } from "../../../../../lib";
import { adminAuth } from "../../../../../lib/firebase/adminInit";
import jwt from "jsonwebtoken";
import {
  getMicrosoftAccessTokenParams,
  MICROSOFT_ACCESS_TOKEN_URI,
  MICROSOFT_READ_PROFILE_URI,
  MICROSOFT_XBOX_TOKEN_URI,
  MICROSOFT_XBOX_XSTS_TOKEN_URI
} from "../../../../../data/defaults/microsoftConfig";

interface MicrosoftUserDetailsI {
  "@odata.context": string;
  displayName: string;
  surname: string;
  givenName: string;
  id: string;
  userPrincipalName: string;
  businessPhones: [];
  jobTitle: null | string;
  mail: null | string;
  mobilePhone: null | string;
  officeLocation: null | string;
  preferredLanguage: null | string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const state = query.state as string;
  const splitedState = state.split(" ");
  const processToken = splitedState[0];
  const processType = splitedState[splitedState.length - 1];

  if (req.query.error && req.query.error === "access_denied") {
    return res.redirect("/");
  }

  try {
    jwt.verify(processToken as string, process.env.JSON_WEB_TOKEN_SECURE_KEY ?? "");
  } catch (e) {
    return res.status(400).send("Process is expired please try again...");
  }

  if (processType === "login") {
    const microsoftAccessTokenResponse = await getMicrosoftAccessToken(
      query.code as string,
      {
        isXboxScopesRequired: false
      },
      res
    );

    if (!microsoftAccessTokenResponse.access_token) return res.redirect("/");

    const microsoftUserDetailsResponse = await getMicrosoftUserDetails(
      microsoftAccessTokenResponse.access_token,
      res
    );
    const { userPrincipalName, id, displayName } =
      microsoftUserDetailsResponse as MicrosoftUserDetailsI;

    await handleLoginProccess(userPrincipalName, id, displayName, req, res);
  } else if (processType === "linkGame") {
    const gameName = splitedState[1];
    const clientToken = splitedState[2];
    const microsoftAccessTokenResponse = await getMicrosoftAccessToken(
      query.code as string,
      {
        isXboxScopesRequired: true
      },
      res
    );
    await handleLinkGameProcess(res, microsoftAccessTokenResponse, gameName, clientToken);
  } else {
    return res.status(401).send("Process type not allowed");
  }
};
export default handler;

const getMicrosoftAccessToken = async (
  code: string,
  { isXboxScopesRequired }: { isXboxScopesRequired: boolean },
  res: NextApiResponse
) => {
  const microsoftAccessTokenParams = getMicrosoftAccessTokenParams(code, isXboxScopesRequired);
  try {
    const accessTokenResponse = await axios.post(
      MICROSOFT_ACCESS_TOKEN_URI,
      microsoftAccessTokenParams,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    return accessTokenResponse.data;
  } catch (e: any) {
    if (e.response?.status === 400) {
      return res.send(e.response.data.error_description);
    }
    return res.status(500).send("Server internal error");
  }
};

const getMicrosoftUserDetails = async (microsoftAccessToken: string, res: NextApiResponse) => {
  try {
    const microsoftUserDetailsResponse = await axios.get(MICROSOFT_READ_PROFILE_URI, {
      headers: {
        Authorization: `Bearer ${microsoftAccessToken}`
      }
    });
    return microsoftUserDetailsResponse.data as MicrosoftUserDetailsI;
  } catch (e) {
    return res.send(e);
  }
};
const getXboxUserToken = async (microsoftAccessToken: string, res: NextApiResponse) => {
  try {
    const xboxTokenParams = JSON.stringify({
      RelyingParty: "http://auth.xboxlive.com",
      TokenType: "JWT",
      Properties: {
        AuthMethod: "RPS",
        SiteName: "user.auth.xboxlive.com",
        RpsTicket: `d=${microsoftAccessToken}`
      }
    });
    const xboxUserTokenResponse = await axios.post(MICROSOFT_XBOX_TOKEN_URI, xboxTokenParams, {
      headers: {
        "x-xbl-contract-version": '"1"',
        "Content-Type": "application/json"
      }
    });
    const xboxUserToken = xboxUserTokenResponse.data.Token;
    return xboxUserToken as string;
  } catch (e) {
    res.status(500).send(e);
    return;
  }
};

const getXboxIdAndGamerTag = async (xboxUserToken: string, res: NextApiResponse) => {
  try {
    const xboxXSTSTokenParams = {
      RelyingParty: "http://xboxlive.com",
      TokenType: "JWT",
      Properties: {
        UserTokens: [xboxUserToken],
        SandboxId: "RETAIL"
      }
    };
    const postData = JSON.stringify(xboxXSTSTokenParams);
    const xboxXSTSTokenResponse = await axios.post(MICROSOFT_XBOX_XSTS_TOKEN_URI, postData, {
      headers: {
        "x-xbl-contract-version": '"1"',
        "Content-Type": "application/json"
      }
    });

    const xboxId = xboxXSTSTokenResponse.data.DisplayClaims.xui[0].xid as string;
    const xboxGamerTag = xboxXSTSTokenResponse.data.DisplayClaims.xui[0].gtg as string;
    return { xboxId, xboxGamerTag };
  } catch (e: any) {
    if (e.response.status === 401) {
      res.redirect("https://www.xbox.com/en-US/");
      return;
    }
    res.redirect("/");
    return;
  }
};

const saveLinkGameForUser = async (userId: string, gameName: string, platformData) => {
  const linkedGameDataForUser = {
    gameAccounts: {
      [gameName]: {
        xboxData: { ...platformData }
      }
    }
  };
  await updateUser(userId, linkedGameDataForUser);
};

const handleLoginProccess = async (
  microsoftEmail: string,
  microsoftId: string,
  microsoftUsername: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const userRecord = await adminAuth.getUserByEmail(microsoftEmail);
    const createdTokenByFirebase = await adminAuth.createCustomToken(userRecord.uid);
    setCookies("custom-token", createdTokenByFirebase, { req, res });
  } catch (e) {
    const newUser = await adminAuth.createUser({
      uid: microsoftId,
      email: microsoftEmail,
      providerToLink: {
        providerId: "microsoft.com",
        uid: microsoftId,
        displayName: microsoftUsername,
        email: microsoftEmail
      }
    });
    await createUser(newUser.uid, {
      username: microsoftUsername,
      email: microsoftEmail
    });
    const createdTokenByFirebase = await adminAuth.createCustomToken(newUser.uid);
    setCookies("custom-token", createdTokenByFirebase, { req, res });
  }
  return res.redirect("/");
};
const handleLinkGameProcess = async (
  res: NextApiResponse,
  microsoftAccessTokenResponse: any,
  gameName?: string,
  clientToken?: string
) => {
  const xboxUserToken = await getXboxUserToken(microsoftAccessTokenResponse.access_token, res);
  if (!xboxUserToken) return;
  const xboxIdAndGamerTag = await getXboxIdAndGamerTag(xboxUserToken, res);
  if (!xboxIdAndGamerTag) return;
  const { xboxGamerTag, xboxId } = xboxIdAndGamerTag;

  if (gameName) {
    if (!clientToken) {
      return res.status(400).send(`User token required to link account with ${gameName}`);
    }
    if (gameName === "halo") {
      try {
        const decodedFirebaseUser = await adminAuth.verifyIdToken(clientToken);
        const userId = decodedFirebaseUser.uid;
        const platformData = {
          ...microsoftAccessTokenResponse,
          xboxGamerTag,
          xboxId
        };
        await saveLinkGameForUser(userId, gameName, platformData);
      } catch (e) {
        res.status(400).send("User token not valid");
      }

      return res.redirect("/competitor");
    } else {
      return res.status(400).send(`Game name :${gameName} is not valid`);
    }
  }
};

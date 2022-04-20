import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import nextConnect from "next-connect";
import { updateUser } from "~/lib";
import axios from "axios";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

export default handler.post(async (req, res) => {
  const { username, userIdToken } = req.body;

  if (!username || !userIdToken) return res.send("Username and user id required");
  if (!process.env.JSON_WEB_TOKEN_SECURE_KEY) return res.send("secure key not found");

  const decodedUserId = jwt.verify(userIdToken as string, process.env.JSON_WEB_TOKEN_SECURE_KEY);
  // const uri = `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${username}`;
  const uri = `/`;
  try {
    const getOriginPlatformInfo = await axios.get(uri, {
      headers: {
        "TRN-Api-Key": "be3d01b8-e66f-4594-9df7-326a0e1a1430"
      }
    });

    const originInfo = { ...getOriginPlatformInfo.data.data.platformInfo };
    await updateUser(decodedUserId as string, {
      gameAccounts: {
        // apex: {
        //   originInfo
        // }
      }
    });
    return res.json({ data: getOriginPlatformInfo.data.platformInfo });
  } catch (e: any) {
    console.log(e);
    return res.json({ err: `We could not find the player ${username} on Origin.` });
  }

  // if (getOriginPlatformInfo.data.errors) {
  //   console.log("errorconsole", getOriginPlatformInfo.data.errors);
  //   return res.send(getOriginPlatformInfo.data.errors[0].message);
  // }

  // console.log(getOriginPlatformInfo.data.data.platformInfo);
});

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*
example of verified cb function see documents: https://github.com/jaredhanson/passport-oauth2

 function(accessToken, refreshToken, profile, cb) {
   User.findOrCreate({ exampleId: profile.id }, function (err, user) {
     return cb(err, user);
   });

*/

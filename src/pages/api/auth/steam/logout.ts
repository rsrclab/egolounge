import { removeCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { steamIdCookieName } from "~/data";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
export default handler.get(async (req, res) => {
  removeCookies(steamIdCookieName, { req, res });
  removeCookies(steamIdCookieName);
  res.redirect("/competitor");
});

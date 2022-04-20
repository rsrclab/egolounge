import { removeCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { battleNetAccessTokenCookieName, battleNetAccountIdCookieName } from "~/data";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
export default handler.get(async (req, res) => {
  removeCookies(battleNetAccessTokenCookieName, { req, res });
  removeCookies(battleNetAccountIdCookieName, { req, res });
  removeCookies(battleNetAccessTokenCookieName);
  removeCookies(battleNetAccountIdCookieName);
  res.redirect("/competitor");
});

import { NextApiRequest, NextApiResponse } from "next";
import { rsoLogoutUri } from "../../../../../data/gamePlatformApis/rsoConfig";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(405).send("Method not allowed");
  }

  return res.status(200).json({ Redirect: rsoLogoutUri });
};
export default handler;

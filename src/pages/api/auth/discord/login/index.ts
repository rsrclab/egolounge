import { NextApiRequest, NextApiResponse } from "next/types";
import { buildDiscordAuthorizationUri } from "../../../../../data/defaults/discordConfig";
import { generateProcessToken } from "../../../../../utils/generateProcessToken";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.redirect("/");
  }
  const processToken = generateProcessToken({ expiresIn: "120000" }); // process will expire in 2 minute
  const uri = buildDiscordAuthorizationUri(processToken);
  return res.status(200).json({ Redirect: uri });
};
export default handler;

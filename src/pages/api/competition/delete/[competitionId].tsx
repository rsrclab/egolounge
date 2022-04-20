import { NextApiHandler } from "next";
import { createCompetition, getUser } from "~/lib";
import { games } from "~/data";

export const handler: NextApiHandler = async (req, res) => {
  const { competitionId, userId } = req.query;

  try {
    if (req.method === "DELETE" && req?.query) {
      if (req?.body) {
        res.status(200).json({ success: true, competitionId });

        return;
      } else {
        res.status(404).json({
          success: false,
          error: "XXX must be supplied"
        });
        return;
      }
    } else {
      res.status(404).json({ success: false, error: "Method not allowed" });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ success: false, error: "Unknown error" });
    return;
  }
};

export default handler;

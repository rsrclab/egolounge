import { NextApiHandler } from "next";
import { updateUserPrimaryGame } from "~/lib";

export const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { userId, newPrimaryGame } = req?.body as {
        userId: string;
        newPrimaryGame: string;
      };

      if (userId?.length === 28 && newPrimaryGame?.length > 0) {
        try {
          await updateUserPrimaryGame(userId, newPrimaryGame);

          res.status(200).send({ success: true });
        } catch (e) {
          console.log(e);
          console.log("error in updating primary game /api/competitor");
          res.status(404).send({ success: false, error: "Unknown error" });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Fields are incorrect or not provided"
        });
        return;
      }
    } else {
      res.status(404).send({ success: false, error: "Method not allowed" });
      return;
    }
  } catch (e) {
    console.log(e);
    console.log("004 code");
    res.status(404).send({ success: false, error: "Unknown error" });
  }
};

export default handler;

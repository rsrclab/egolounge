import { NextApiHandler } from "next";
import { createUserLocalStrategy } from "~/lib";
import { IUserInput } from "~/types";

export const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const newUserData: IUserInput = req.body;

      if (Object.keys(newUserData)?.length > 0) {
        try {
          console.log(newUserData);
          const createdUser = await createUserLocalStrategy(newUserData);
          res.status(200).send({ success: true, user: createdUser });
        } catch (e) {
          console.log(e);
          console.log("error in updating getting competition by id /api/competitor");
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

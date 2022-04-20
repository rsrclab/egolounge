import { NextApiHandler } from "next";
import { signInUserLocalStrategy } from "~/lib";

export const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      if (email && password) {
        try {
          console.log("signing from here");
          const signInRes = await signInUserLocalStrategy({ email, password });
          res.status(200).send({ success: true, signedInUser: signInRes });
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

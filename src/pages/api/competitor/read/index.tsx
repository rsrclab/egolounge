import { NextApiHandler } from "next";
import { getUser } from "~/lib";

export const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { userId } = req?.query as {
        userId: string;
      };
      try {
        const user = await getUser(userId as string);
        res.status(200).send({ success: true, user });
        return;
      } catch (e) {
        console.log(e);
        console.log("error in updating primary game /api/competitor");
        res.status(404).send({ success: false, error: "Unknown error" });
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
    return;
  }
};

export default handler;

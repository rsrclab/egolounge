import { NextApiHandler } from "next";
import { updateUserAvatar, updateUserPrimaryGame } from "~/lib";

// FIXME: Not working really and not being used atm

export const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { userId, avatarFileBlob } = req?.body as {
        userId: string;
        avatarFileBlob: Blob;
      };

      console.log(avatarFileBlob);

      if (userId?.length === 28 && avatarFileBlob) {
        try {
          const newAvatarFileBlob = await updateUserAvatar(userId, avatarFileBlob);

          res.status(200).send({ success: true, newAvatarFileBlob });
        } catch (e) {
          console.log(e);
          console.log("error in updating avatar /api/competitor");
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

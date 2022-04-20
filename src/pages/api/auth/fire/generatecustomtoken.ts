import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../../../lib/firebase/adminInit";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(404).json({ success: false, body: "method not found" });
  }

  if (req.method === "POST") {
    const { uid } = req.body;
    try {
      const createdTokenByFirebase = await adminAuth.createCustomToken(uid);
      return res.status(200).json({ success: true, body: createdTokenByFirebase });
    } catch (e) {
      return res.status(501).json({ success: false, body: "something went wrong" });
    }
  }
};
export default handler;

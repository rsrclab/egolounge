import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { mode, oobCode, apiKey } = req.query;
  if (!mode || !oobCode) return res.redirect("/");
  if (mode !== "resetPassword" && mode !== "recoverEmail" && mode !== "verifyEmail")
    return res.redirect("/");
  const confirmEmailVerificationUri = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;

  try {
    const confirmEmailVerificationResponse = await axios.post(
      confirmEmailVerificationUri,
      { oobCode },
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const verifiedEmail = confirmEmailVerificationResponse.data.email;
    return res.redirect(`/register/success/process?email=${verifiedEmail}`);
  } catch (e: any) {
    const errMessage = e.response.data.error.message;
    if (errMessage === "EXPIRED_OOB_CODE") {
      return res.redirect(`/register/error/errorMsg?msg=Process is expired please try again...`);
    }
    if (errMessage === "INVALID_OOB_CODE") {
      return res.redirect(`/register/error/errorMsg?msg=Something went wrong please try again...`);
    }
    if (errMessage === "USER_DISABLED") {
      return res.redirect(
        `/register/error/errorMsg?msg=The user account has been disabled by an administrator.`
      );
    }
    if (errMessage === "EMAIL_NOT_FOUND") {
      return res.redirect(
        `/register/error/errorMsg?msg=There is no user record corresponding to this identifier. The user may have been deleted.`
      );
    }

    return res.redirect(`/register/error/errorMsg?msg=Something went wrong.`);
  }
};
export default handler;

import axios from "axios";

import cors from "cors";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { updateUser } from "../../../lib";

const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.use(cors({ origin: "*" }));
export default handler.post(async (req, res) => {
  try {
    // const exchangeBattlenetCredentialsToGetCallOfDutyBaseUriParams = new URLSearchParams({
    //   code,
    //   intent: "login",
    //   returnUrl: "https://profile.callofduty.com/cod/thirdPartyAuth/resolve/battle"
    // });
    // res.redirect(exchangeBattlenetCredentialsToGetCallOfDutyBaseUri, {
    //   params: exchangeBattlenetCredentialsToGetCallOfDutyBaseUriParams,
    //   headers: {
    //     AUTHORIZATION: `bearer ${access_token}`
    //   }
    // });
    // // console.log(resdata);
    // const hmmm = await axios.get(
    //   `https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/battle/gamer/${readyUsername}/profile/friends/type/mp`
    // );
    // console.log("resdata", readyUsername, hmmm);
    // if (userId?.length > 0 && username?.length > 0) {
    //   const hardcodedusername = "hahahahha";
    //   const getCsrfTokenUri = "https://s.activision.com/activision/login";
    //   const csrfTokenResponse = await axios.get(getCsrfTokenUri);
    //   const currentXSRFToken = csrfTokenResponse.headers["set-cookie"]
    //     ? csrfTokenResponse.headers["set-cookie"][0].split(";")[0]
    //     : "";
    //   const csrfToken = currentXSRFToken.split("=")[1];
    //   // console.log("csrftoken", currentXSRFToken, csrfToken);
    //   const SSOandATKNTokenURI = "https://s.activision.com/do_login";
    //   const SSoAndAtknTokenResponse = await axios.post(
    //     SSOandATKNTokenURI,
    //     {
    //       username: "fatihkurt387@gmail.com",
    //       password: "4mR44ptPwWBt",
    //       remember_me: true,
    //       _csrf: csrfToken
    //     },
    //     {
    //       params: { new_SiteId: "activision" },
    //       headers: {
    //         "XSRF-TOKEN": csrfToken,
    //         new_SiteId: "activision"
    //       }
    //     }
    //   );
    //   // console.log("ssoandtoken", SSoAndAtknTokenResponse.data);
    //   const codWarzoneApiMatch = `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/gamer/${hardcodedusername}/matches/wz/start/0/end/0/details`;
    //   let codWarzoneData = await axios.get(codWarzoneApiMatch, {
    //     headers: {
    //       Cookie:
    //         "ACT_SSO_COOKIE=Set by test scripts; ACT_SSO_COOKIE_EXPIRY=1591153892430; atkn=Set by test scripts;"
    //     }
    //   });
    //   const newUserData = {
    //     gameAccounts: {
    //       codwarzone: {
    //         ...codWarzoneData.data
    //       }
    //     }
    //   };
    //   // console.log("codwarzonedata", codWarzoneData.data);
    //   await updateUser(userId, newUserData);
    //   res.status(200).json({ success: true });
    // } else {
    //   res.status(404).json({
    //     success: false,
    //     error: "userid and username must be supplied"
    //   });
    // }
  } catch (e) {
    console.log(e);
    // if ((e as any)?.response?.statusText === "Not Found") {
    //   res
    //     .status(404)
    //     .json({ success: false, error: `User with username ${username} was not found!` });
    // } else {
    //   res.status(404).json({ success: false, error: "Unknown error" });
    // }
  }
});

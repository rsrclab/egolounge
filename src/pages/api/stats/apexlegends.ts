// import axios from "axios";
// import { NextApiHandler } from "next";
// import { updateUser } from "../../../lib";

// export const handler: NextApiHandler = async (req, res) => {
//   const { userId, originUsername } = req.body;

//   try {
//     if (req.method === "POST") {
//       if (userId?.length > 0 && originUsername?.length > 0) {
//         let apexUserData = await axios.get(
//           `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${originUsername}`,
//           {
//             headers: {
//               "TRN-Api-Key": process.env.TRACKER_GG_API_KEY ?? ""
//             }
//           }
//         );

//         //TODO apexlegend stats data will save db here.
//         // const newUserData = {
//         //   gameAccounts: {
//         //     apex: {
//         //       ...apexUserData.data
//         //     }
//         //   }
//         // };

//         // await updateUser(userId, newUserData);
//         res.status(200).send(apexUserData.data);
//       } else {
//         res.status(404).json({
//           success: false,
//           error: "userid and username must be supplied"
//         });
//       }
//     } else {
//       res.status(404).json({ success: false, error: "Method not allowed" });
//     }
//   } catch (e) {
//     console.log(e);
//     // if ((e as any)?.response?.statusText === "Not Found") {
//     //   res
//     //     .status(404)
//     //     .json({ success: false, error: `User with username ${username} was not found!` });
//     // } else {
//     //   res.status(404).json({ success: false, error: "Unknown error" });
//     // }
//   }
// };

// export default handler;
export {};

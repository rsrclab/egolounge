import axios from "axios";
import { NextApiHandler } from "next";
import { games } from "~/data";
import { getCompetition, getUser, joinACompetitionByCode } from "~/lib";
import { IGame, IUser } from "~/types";
import { createCompetitionDefaultPlayer } from "~/utils";

export const handler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { competitionId, userId } = req?.query as {
        competitionId: string;
        userId: string;
      };

      // id lengths from database
      if (competitionId?.length === 20 && userId?.length === 28) {
        try {
          const competitionToJoinData = await getCompetition(competitionId);

          if (Object.keys(competitionToJoinData)?.length === 0) {
            res.status(400).send({ success: false, message: "Competition does not exist" });
            return;
          }

          if (competitionToJoinData.state !== "waitingToStart") {
            res.status(400).send({ success: false, message: "Competition has already started" });
            return;
          }

          const gameToCompeteIn = games.find(({ name }) => name === competitionToJoinData.game);

          const userToJoin = (await getUser(userId)) as IUser;

          const userAlreadyInCompetition = competitionToJoinData?.players.find(
            ({ id }) => id === userId
          );

          if (userAlreadyInCompetition) {
            res
              .status(400)
              .send({ success: false, message: "You have already joined the competition" });
            return;
          }

          const maxPlayersLimitReached =
            competitionToJoinData.players.length === gameToCompeteIn?.maxPlayers;

          if (maxPlayersLimitReached) {
            res
              .status(400)
              .send({ success: false, message: "You can not join. The competition is full." });
            return;
          }

          console.log(userToJoin.gameAccounts);

          if (gameToCompeteIn) {
            const userHasGameLinked =
              userToJoin.gameAccounts &&
              Object.keys(userToJoin.gameAccounts).find(
                key => gameToCompeteIn?.shorthand === key
              ) &&
              userToJoin.gameAccounts[gameToCompeteIn?.shorthand] !== null;

            if (!userHasGameLinked) {
              res.status(400).send({
                success: false,
                message: `${gameToCompeteIn?.name} is not linked.`,
                gameName: `${gameToCompeteIn?.name}`
              });
              return;
            }
          }

          const joiningUserDefaultData = createCompetitionDefaultPlayer({
            user: { ...userToJoin, id: userId },
            gameToCompeteIn: {
              shorthand: gameToCompeteIn?.shorthand as IGame["shorthand"],
              stats: gameToCompeteIn?.stats as IGame["stats"]
            }
          });

          await joinACompetitionByCode(joiningUserDefaultData, competitionId);

          await axios.get(
            `/server/competition-player-joined?competitionId=${competitionId}&playerId=${userId}`,
            {
              baseURL: `http://localhost:${process?.env?.PORT || 3000}`
            }
          );

          res.status(200).send({ success: true });
          // res.status(200).send({ success: true, data: addedPlayerRes });
        } catch (e) {
          console.log(e);
          console.log("error in player-joined /api/competition");
          res.status(404).send({ success: false, error: "Unknown error" });
        }
      } else {
        res.status(400).send({
          success: false,
          message: "Competition or User ID is incorrect or not provided"
        });
        return;
      }
    } else {
      res.status(404).send({ success: false, error: "Method not allowed" });
      return;
    }
  } catch (e) {
    console.log(e);
    console.log("003 code");
    res.status(404).send({ success: false, error: "Unknown error" });
  }
};

export default handler;

import { NextApiHandler } from "next";
import { createCompetition, getUser } from "~/lib";
import { games } from "~/data";

export const handler: NextApiHandler = async (req, res) => {
  const {
    players,
    startTime,
    duration,
    game,
    numberOfPlayers,
    isOver,
    name,
    state,
    amPm,
    userId,
    timezoneOffset,
    hasDaylightSaving,
    startsAt
  } = req.body;

  try {
    if (req.method === "POST" && req?.body) {
      if (req?.body) {
        const creator = await getUser(userId);
        const gameName = games.find(({ name }) => name === game)?.shorthand;

        if (creator.gameAccounts?.[gameName as string]) {
          const competitionId = await createCompetition(userId, {
            players,
            numberOfPlayers,
            startsAt: startsAt,
            amPm,
            duration,
            game,
            isOver,
            name,
            startTime,
            state
          });

          res.status(200).json({ success: true, competitionId });

          return;
        } else {
          res.status(400).json({
            success: false,
            error: `You do not have ${game} linked.<br/>Please link in Account Settings.`
          });
          return;
        }
      } else {
        res.status(404).json({
          success: false,
          error: "XXX must be supplied"
        });
        return;
      }
    } else {
      res.status(404).json({ success: false, error: "Method not allowed" });
      return;
    }
  } catch (e) {
    console.log(e);
    console.log("002 code");
    res.status(404).json({ success: false, error: "Unknown error" });
    return;
  }
};

export default handler;

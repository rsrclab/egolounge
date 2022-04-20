import "dotenv/config";

import { createServer } from "http";
import { parse } from "url";
import { Server as SocketIOServer } from "socket.io";
import next from "next";
import { getAllCompetitionsForServer, getCompetition, getUser } from "../lib/firebase";
import { Competition, CompetitionConstructor } from "./competition";
import { ICompetitionDb, IGame, IUser } from "../types/global";
import { LoLCompetition } from "./competitions/LoLCompetition";
import { games } from "../data/defaults/games";
import { createCompetitionDefaultPlayer } from "../utils";
import { CSGOCompetition } from "./competitions/CSGOCompetition";
import { FortniteCompetition } from "./competitions/FortniteCompetition";
import { ValorantCompetition } from "./competitions/ValorantCompetition";
import { PUBGCompetition } from "./competitions/PUBGCompetition";
// import { ApexCompetition } from "./competitions/ApexCompetition";
import { Dota2Competition } from "./competitions/Dota2Competition";
// import { sendNewCompetitionToDiscord } from "./discord-bot/bot";
import { HaloCompetition } from "./competitions/HaloCompetition";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const nextJSRequestHandler = app.getRequestHandler();

const competitions: Competition[] = [];

const createCompetitionClass = (
  shorthand: IGame["shorthand"],
  competitionData: CompetitionConstructor
) => {
  switch (shorthand) {
    case "halo":
      const haloCompetition = new HaloCompetition(competitionData);
      haloCompetition.initializeCompetition();
      return haloCompetition;
    case "leagueOfLegends":
      const lolCompetition = new LoLCompetition(competitionData);
      lolCompetition.initializeCompetition();
      return lolCompetition;
    case "valorant":
      const valorantcompetition = new ValorantCompetition(competitionData);
      valorantcompetition.initializeCompetition();
      return valorantcompetition;
    case "csgo":
      const csgoCompetition = new CSGOCompetition(competitionData);
      csgoCompetition.initializeCompetition();
      return csgoCompetition;
    case "fortnite":
      const fortniteCompetition = new FortniteCompetition(competitionData);
      fortniteCompetition.initializeCompetition();
      return fortniteCompetition;

    case "dota":
      const dotaCompetition = new Dota2Competition(competitionData);
      dotaCompetition.initializeCompetition();
      return dotaCompetition;
    default:
      break;
  }

  return null;
};

const removeCompetitionFromServerArray = (competitionId: string) => {
  const competitionToRemoveIndex = competitions.findIndex(({ id }) => id === competitionId);
  competitions.splice(competitionToRemoveIndex, 1);
};

const initializeCompetitions = async (socket: SocketIOServer) => {
  const initialCompetitions = await getAllCompetitionsForServer();

  initialCompetitions.forEach(competition => {
    const gameName = (games as any).find(({ name }) => name === (competition as any).game)
      ?.shorthand as IGame["shorthand"];

    competitions.push(
      createCompetitionClass(gameName, {
        ...competition,
        socket,
        removeCompetitionFromServerArray
      }) as Competition
    );
  });
};

let socketIO: SocketIOServer;

app.prepare().then(async () => {
  const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);

    switch (parsedUrl.pathname) {
      case "/server/competition-created":
        if (req.method === "GET") {
          const { competitionId } = parsedUrl.query;

          if (competitionId) {
            const newCompetition: ICompetitionDb = await getCompetition(competitionId as string);

            if (Object.keys(newCompetition).length > 0) {
              const gameName = (games as any).find(
                ({ name }) => name === (newCompetition as any).game
              )?.shorthand as IGame["shorthand"];

              competitions.push(
                createCompetitionClass(gameName, {
                  id: competitionId as string,
                  state: newCompetition.state,
                  startsAt: newCompetition.startsAt,
                  duration: newCompetition.duration,
                  game: newCompetition.game,
                  name: newCompetition.name,
                  players: newCompetition.players,
                  socket: socketIO,
                  removeCompetitionFromServerArray
                }) as Competition
              );

              console.log("player", newCompetition.players[0]?.id, "created", competitionId);

              try {
                // sendNewCompetitionToDiscord(payload);
              } catch (e) {
                console.log(e);
              }
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, queryParams: { ...parsedUrl.query } }));
          }
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, message: "ID not provided" }));
        }

        break;
      case "/server/competition-player-joined":
        if (req.method === "GET") {
          const { competitionId, playerId } = parsedUrl?.query as {
            competitionId: string;
            playerId: string;
          };

          try {
            const competitionToJoinData = await getCompetition(competitionId);
            const userToJoin = (await getUser(playerId)) as IUser;

            const gameToCompeteIn = games.find(({ name }) => name === competitionToJoinData.game);

            const joiningUserDefaultData = createCompetitionDefaultPlayer({
              user: { ...userToJoin, id: playerId },
              gameToCompeteIn: {
                shorthand: gameToCompeteIn?.shorthand as IGame["shorthand"],
                stats: gameToCompeteIn?.stats as IGame["stats"]
              }
            });

            const serverCompetitionToJoin = competitions.find(({ id }) => id === competitionId);
            serverCompetitionToJoin?.addPlayer(joiningUserDefaultData);

            console.log("player", playerId, "joined", serverCompetitionToJoin?.id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            console.log(e);
            console.log("0002 code");
          }
        }

        break;
      default:
        nextJSRequestHandler(req, res, parsedUrl);
        break;
    }
  }).listen(port);

  socketIO = new SocketIOServer(server, { transports: ["websocket"] });

  socketIO.setMaxListeners(1000);

  await initializeCompetitions(socketIO);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  );
});

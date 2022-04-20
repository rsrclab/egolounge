import axios from "axios";
import { Competition, CompetitionConstructor } from "../competition";

type LoLCompetitionConstructor = CompetitionConstructor;

const API_KEY = process.env.RIOT_GAMES_DEV_API_KEY;
const GET_LAST_X_GAMES = 5;

const sleep = (timeout: number) => new Promise(res => setTimeout(res, timeout));
export class LoLCompetition extends Competition {
  protected GET_PLAYERS_DATA_INTERVAL = 0.1 * 60 * 1000;
  protected minPlayers = 2;
  protected maxPlayers = 5;

  constructor(lolCompetitionData: LoLCompetitionConstructor) {
    super({ ...lolCompetitionData, game: "League of Legends" });
  }

  protected generateGetPlayerLastGamesReqUrl({ riotData }: any) {
    const { continent, puuid } = riotData;

    return `https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${GET_LAST_X_GAMES}&api_key=${API_KEY}`;
  }

  protected generateGetUserReqUrl({ riotData }: any) {
    const { region, username } = riotData;

    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`;
  }

  protected calculateScore({
    totalDamageDone,
    totalPlayedTime
  }: {
    totalDamageDone: number;
    totalPlayedTime: number;
  }): number {
    return totalDamageDone / totalPlayedTime;
  }

  protected calculatePrimaryScore({ kills }: { kills: number }): number {
    return kills;
  }

  protected calculateSecondaryScore({ assists }: { assists: number }): number {
    return assists;
  }

  protected calculateTertiaryScore({ goldEarned }: { goldEarned: number }): number {
    return goldEarned;
  }

  protected calculateQuaternaryScore({
    totalMinionsKilled
  }: {
    totalMinionsKilled: number;
  }): number {
    return totalMinionsKilled;
  }

  protected async getCurrentPlayersData() {
    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];

        if (i % 4 === 0) {
          await sleep(2000);
        } else {
          await sleep(100);
        }

        const dataRes = await axios.get(player.getPlayerLastMatchesAPIUrl);

        console.log("new match", dataRes.data[0] !== player.lastMatchId);

        if (dataRes.data[0] !== player.lastMatchId) {
          player.lastMatchId = dataRes.data[0] as string;

          const newMatchDataRes = await axios.get(
            `https://${player.gameAccountInfo.riotData.continent}.api.riotgames.com/lol/match/v5/matches/${player.lastMatchId}?api_key=${API_KEY}`
          );

          const matchTimeData = {
            matchStartTime: newMatchDataRes.data.info.gameCreation,
            matchEndTime: newMatchDataRes.data.info.gameEndTimestamp
          };

          console.log(
            "new match in competition time frame",
            this.checkIfMatchIsInCompetitionTimeframe(matchTimeData)
          );

          if (this.checkIfMatchIsInCompetitionTimeframe(matchTimeData)) {
            if (!player.playedMatchesIds && player.lastMatchId) {
              player.playedMatchesIds = [player.lastMatchId];
            } else {
              (player.playedMatchesIds as string[]).push(player.lastMatchId);
            }

            console.log(player.gameAccountInfo.riotData.puuid);

            const {
              kills,
              assists,
              goldEarned,
              totalMinionsKilled,
              neutralMinionsKilled,
              totalDamageDealt,
              timePlayed
            } = newMatchDataRes.data.info.participants.find(
              ({ puuid }) => puuid === player.gameAccountInfo.riotData.puuid
            );

            console.log(
              newMatchDataRes.data.info.participants.find(
                ({ puuid }) => puuid === player.gameAccountInfo.riotData.puuid
              )
            );

            console.log("minions killed", totalMinionsKilled);

            player.updateScore({
              primaryStatScore: this.calculatePrimaryScore({ kills }),
              secondaryStatScore: this.calculateSecondaryScore({ assists }),
              tertiaryStatScore: this.calculateTertiaryScore({ goldEarned }),
              quaternaryStatScore: this.calculateQuaternaryScore({
                totalMinionsKilled: totalMinionsKilled + neutralMinionsKilled
              }),
              score: this.calculateScore({
                totalDamageDone: totalDamageDealt,
                totalPlayedTime: timePlayed
              })
            });
          }
        }
      }

      this.rankPlayers();
      const normalizedPlayers = this.normalizePlayersForFrontEnd();

      this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-newStats`, normalizedPlayers);
    } catch (e) {
      console.log(e);
      console.log("00002 code");
    }
  }

  protected waitingToStartToInProgressMiddleware() {
    const wellItsNotNeeded = "for now";
  }
}

import axios from "axios";
import { Competition, CompetitionConstructor } from "../competition";

type ValorantCompetitionConstructor = CompetitionConstructor;

const API_KEY = process.env.RIOT_GAMES_VAL_DEV_API_KEY;
const GET_LAST_X_GAMES = 5;

const sleep = (timeout: number) => new Promise(res => setTimeout(res, timeout));
export class ValorantCompetition extends Competition {
  protected GET_PLAYERS_DATA_INTERVAL = 1 * 60 * 1000;
  protected minPlayers = 2;
  protected maxPlayers = 5;

  constructor(valorantCompetitionData: ValorantCompetitionConstructor) {
    super({ ...valorantCompetitionData, game: "Valorant" });
  }

  protected generateGetPlayerLastGamesReqUrl({ riotData }: any) {
    const { puuid, continent } = riotData;

    return `https://${continent}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}?api_key=${API_KEY}`;
  }

  protected generateGetUserReqUrl({ riotData }: any) {
    const { username, region } = riotData;

    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${API_KEY}`;
  }

  protected calculateScore({ score }: { score: number }): number {
    const scoreConstant = 100;

    return score / scoreConstant;
  }

  protected calculatePrimaryScore({ kills }: { kills: number }): number {
    return kills;
  }

  protected calculateSecondaryScore({ assists }: { assists: number }): number {
    return assists;
  }

  protected calculateTertiaryScore({ grenadeCasts }: { grenadeCasts: number }): number {
    return grenadeCasts;
  }

  protected calculateQuaternaryScore({ ultimateCasts }: { ultimateCasts: number }): number {
    return ultimateCasts;
  }

  protected async getCurrentPlayersData() {
    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];

        if (i % 4 === 0) {
          await sleep(2000);
        }

        const dataRes = await axios.get(player.getPlayerLastMatchesAPIUrl);
        const lastMatchId: string = dataRes.data?.history[0]?.matchId;
        // console.log(dataRes.data?.history[0]?.matchId);
        const newStats = lastMatchId !== player.lastMatchId && lastMatchId !== undefined;

        if (newStats) {
          player.lastMatchId = lastMatchId;

          const newMatchDataRes = await axios.get(
            `https://${player.gameAccountInfo.riotData.continent}.api.riotgames.com/val/match/v1/matches/${player.lastMatchId}?api_key=${API_KEY}`
          );

          const matchTimeData = {
            matchStartTime: newMatchDataRes.data.matchInfo.gameStartMillis,
            matchEndTime:
              newMatchDataRes.data.matchInfo.gameStartMillis +
              newMatchDataRes.data.matchInfo.gameLengthMillis
          };

          if (this.checkIfMatchIsInCompetitionTimeframe(matchTimeData)) {
            if (!player.playedMatchesIds && player.lastMatchId) {
              player.playedMatchesIds = [player.lastMatchId];
            } else {
              (player.playedMatchesIds as string[]).push(player.lastMatchId);
            }

            console.log(
              newMatchDataRes.data.players.find(
                ({ puuid }) => puuid === player.gameAccountInfo.riotData.puuid
              )
            );
            const { kills, assists, abilityCasts, score } = newMatchDataRes.data.players.find(
              ({ puuid }) => puuid === player.gameAccountInfo.riotData.puuid
            )?.stats;

            const { grenadeCasts, ultimateCasts } = abilityCasts;

            player.updateScore({
              primaryStatScore: this.calculatePrimaryScore({ kills }),
              secondaryStatScore: this.calculateSecondaryScore({ assists }),
              tertiaryStatScore: this.calculateTertiaryScore({ grenadeCasts }),
              quaternaryStatScore: this.calculateQuaternaryScore({ ultimateCasts }),
              score: this.calculateScore({
                score
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
      console.log("00002 code val");
    }
  }

  protected waitingToStartToInProgressMiddleware() {
    const wellItsNotNeeded = "for now";
  }
}

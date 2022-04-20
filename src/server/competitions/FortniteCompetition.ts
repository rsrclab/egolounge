import { axiosInstance } from "../../lib";
import { Competition, CompetitionConstructor } from "../competition";

type FortniteCompetitionConstructor = CompetitionConstructor;

const API_KEY = process.env.FORTNITE_API_DEV_KEY || "";

type FortnitePlayerCompetitionData = {
  kills: number;
  playersOutlived: number;
  top3: number;
  wins: number;
  score: number;
  minutesPlayed: number;
  playerId: string;
};

export class FortniteCompetition extends Competition {
  protected GET_PLAYERS_DATA_INTERVAL: number = 0.1 * 60 * 1000;

  protected minPlayers: number = 2;
  protected maxPlayers: number = 5;

  private initialPlayersData: FortnitePlayerCompetitionData[];

  constructor(fortniteCompetitionData: FortniteCompetitionConstructor) {
    super({ ...fortniteCompetitionData, game: "Fortnite" });

    this.initialPlayersData = [];
  }

  protected calculateScore({ score, minutesPlayed, playerIndex }: any): number {
    const scoreConstant = 2.5;
    const newScore = score - this.initialPlayersData[playerIndex].score;
    const newMinutesPlayed = minutesPlayed - this.initialPlayersData[playerIndex].minutesPlayed;

    const newTotalScore = (newScore / newMinutesPlayed) * scoreConstant;

    this.initialPlayersData[playerIndex].minutesPlayed = minutesPlayed;
    this.initialPlayersData[playerIndex].score = score;

    return newTotalScore;
  }

  protected calculatePrimaryScore({ kills, playerIndex }: any): number {
    const newKills = kills - this.initialPlayersData[playerIndex].kills;
    this.initialPlayersData[playerIndex].kills = kills;

    return newKills;
  }

  protected calculateSecondaryScore({ playersOutlived, playerIndex }: any): number {
    const newPlayersOutlived =
      playersOutlived - this.initialPlayersData[playerIndex].playersOutlived;
    this.initialPlayersData[playerIndex].playersOutlived = playersOutlived;

    return newPlayersOutlived;
  }

  protected calculateTertiaryScore({ top3, playerIndex }: any): number {
    const newtop3 = top3 - this.initialPlayersData[playerIndex].top3;

    this.initialPlayersData[playerIndex].top3 = top3;

    return newtop3;
  }

  protected calculateQuaternaryScore({ wins, playerIndex }: any): number {
    const newwins = wins - this.initialPlayersData[playerIndex].wins;

    this.initialPlayersData[playerIndex].wins = wins;

    return newwins;
  }

  protected async waitingToStartToInProgressMiddleware() {
    const zeroInitialStats: FortnitePlayerCompetitionData = {
      kills: 0,
      playersOutlived: 0,
      top3: 0,
      wins: 0,
      minutesPlayed: 1,
      score: 1,
      playerId: ""
    };

    for (let i = 0; i < this.players.length; i++) {
      this.initialPlayersData[i] = { ...zeroInitialStats };
    }

    const initialData = await this.getCurrentPlayersData();

    for (let i = 0; i < this.players.length; i++) {
      this.initialPlayersData[i] = { ...initialData[i] };

      this.players[i].updateScore({
        primaryStatScore: -this.players[i].stats.primaryStatScore.value,
        secondaryStatScore: -this.players[i].stats.secondaryStatScore.value,
        tertiaryStatScore: -this.players[i].stats.tertiaryStatScore.value,
        quaternaryStatScore: -this.players[i].stats.quaternaryStatScore.value,
        score: -this.players[i].stats.score
      });

      this.players[i].playedMatchesIds.push("0");
    }
  }

  protected async getCurrentPlayersData(): Promise<FortnitePlayerCompetitionData[]> {
    const retrievedStats: FortnitePlayerCompetitionData[] = [];

    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];

        const newMatchDataRes = await axiosInstance.get(player.getPlayerAccountDetailAPIUrl, {
          headers: {
            Authorization: API_KEY
          }
        });

        const {
          kills,
          playersOutlived,
          top3,
          wins,
          score,
          minutesPlayed
        }: FortnitePlayerCompetitionData = newMatchDataRes.data.data.stats.all.overall;

        const newStats = this.initialPlayersData[i].minutesPlayed < minutesPlayed;

        if (newStats) {
          player.updateScore({
            primaryStatScore: this.calculatePrimaryScore({ kills, playerIndex: i }),
            secondaryStatScore: this.calculateSecondaryScore({ playersOutlived, playerIndex: i }),
            tertiaryStatScore: this.calculateTertiaryScore({ top3, playerIndex: i }),
            quaternaryStatScore: this.calculateQuaternaryScore({
              wins,
              playerIndex: i
            }),
            score: this.calculateScore({
              score,
              minutesPlayed,
              playerIndex: i
            })
          });

          retrievedStats[i] = {
            kills,
            playersOutlived,
            wins,
            top3,
            score,
            minutesPlayed,
            playerId: player.dbId
          };
        }

        this.rankPlayers();
        const normalizedPlayers = this.normalizePlayersForFrontEnd();

        this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-newStats`, normalizedPlayers);
      }
    } catch (e) {
      console.log(e);
      console.log("fortnite code");
    }

    return retrievedStats;
  }

  protected generateGetUserReqUrl({ epicGameData }): string {
    const { account_id } = epicGameData;

    return `https://fortnite-api.com/v2/stats/br/v2/${account_id}`;
  }

  protected generateGetPlayerLastGamesReqUrl(userReqData): string {
    return "not needed for Fortnite";
  }
}

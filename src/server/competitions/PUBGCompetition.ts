import { axiosInstance } from "../../lib";
import { Competition, CompetitionConstructor } from "../competition";

type PUBGCompetitionConstructor = CompetitionConstructor;

const API_KEY = process.env.PUBG_API_KEY;

type PUBGPlayerCompetitionData = {
  kills: number;
  damageDealt: number;
  boosts: number;
  heals: number;
  timeSurvived: number;
};

export class PUBGCompetition extends Competition {
  protected initialPlayersData: PUBGPlayerCompetitionData[] = [];

  protected minPlayers: number = 2;
  protected maxPlayers: number = 5;

  constructor(pubgCompetitionData: PUBGCompetitionConstructor) {
    super({ ...pubgCompetitionData, game: "PUBG" });
  }

  protected calculateScore({ damageDealt, timeSurvived, playerIndex }: any): number {
    const scoreConstant = 8;
    const newDamageDealt = damageDealt - this.initialPlayersData[playerIndex].damageDealt;
    const newTimeSurvived = timeSurvived - this.initialPlayersData[playerIndex].timeSurvived;

    return (newDamageDealt / newTimeSurvived) * scoreConstant;
  }

  protected calculatePrimaryScore({ kills, playerIndex }: any): number {
    return kills - this.initialPlayersData[playerIndex].kills;
  }

  protected calculateSecondaryScore({ damageDealt, playerIndex }: any): number {
    return damageDealt - this.initialPlayersData[playerIndex].damageDealt;
  }

  protected calculateTertiaryScore({ boosts, playerIndex }: any): number {
    return boosts - this.initialPlayersData[playerIndex].boosts;
  }

  protected calculateQuaternaryScore({ heals, playerIndex }: any): number {
    return heals - this.initialPlayersData[playerIndex].heals;
  }

  protected async waitingToStartToInProgressMiddleware() {
    const zeroInitialStats: PUBGPlayerCompetitionData = {
      kills: 0,
      damageDealt: 0,
      boosts: 0,
      heals: 0,
      timeSurvived: 1 // used as a divider cant be 0 returns NaN and breaks stuff
    };

    for (let i = 0; i < this.players.length; i++) {
      this.initialPlayersData.push(zeroInitialStats);
    }

    const initialData = await this.getCurrentPlayersData();

    for (let i = 0; i < this.players.length; i++) {
      this.initialPlayersData[i].kills = initialData?.kills;
      this.initialPlayersData[i].damageDealt = initialData?.damageDealt;
      this.initialPlayersData[i].boosts = initialData?.boosts;
      this.initialPlayersData[i].heals = initialData?.heals;
      this.initialPlayersData[i].timeSurvived = initialData?.timeSurvived;

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

  protected async getCurrentPlayersData() {
    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];

        const newMatchDataRes = await axiosInstance.get(player.getPlayerAccountDetailAPIUrl, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            accept: "application/vnd.api+json"
          }
        });

        const { kills, damageDealt, boosts, heals, timeSurvived } =
          newMatchDataRes.data.data.attributes.gameModeStats.solo;

        const newScore = this.calculateScore({ damageDealt, timeSurvived, playerIndex: i });

        const newStats = player.stats.score < newScore;

        if (newStats) {
          player.updateScore({
            primaryStatScore: this.calculatePrimaryScore({ kills, playerIndex: i }),
            secondaryStatScore: this.calculateSecondaryScore({ damageDealt, playerIndex: i }),
            tertiaryStatScore: this.calculateTertiaryScore({ boosts, playerIndex: i }),
            quaternaryStatScore: this.calculateQuaternaryScore({
              heals,
              playerIndex: i
            }),
            score: newScore
          });

          this.rankPlayers();
          const normalizedPlayers = this.normalizePlayersForFrontEnd();

          this.socket
            .to(this.socketRoomId)
            .emit(`${this.socketRoomId}-newStats`, normalizedPlayers);

          return {
            kills,
            damageDealt,
            heals,
            boosts,
            timeSurvived
          };
        }
      }
    } catch (e) {
      console.log(e);
      console.log("pubg code");
    }

    return null;
  }

  protected generateGetUserReqUrl({ steamData }: { steamData: any }): string {
    const { steamid } = steamData;

    return `https://api.pubg.com/shards/steam/players/${steamid}/seasons/lifetime?filter[gamepad]=false`;
  }

  protected generateGetPlayerLastGamesReqUrl(userReqData): string {
    return "not needed for pubg";
  }
}

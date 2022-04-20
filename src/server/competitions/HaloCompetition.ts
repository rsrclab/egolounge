import { Competition, CompetitionConstructor } from "../competition";
import { Player } from "../player";

const API_KEY = process.env.HALO_API_DEV_KEY;

const lib = require("lib")({
  token: API_KEY
});

type HaloCompetitionConstructor = CompetitionConstructor;

type HaloPlayerCompetitionData = {
  medals: number;
  kills: number;
  assists: number;
  shotsLanded: number;
  totalScore: number;
  timePlayed: number;
  playerId: string;
};

export class HaloCompetition extends Competition {
  private initialPlayersData: HaloPlayerCompetitionData[];

  protected GET_PLAYERS_DATA_INTERVAL = 0.1 * 60 * 1000;
  protected minPlayers: number = 1;
  protected maxPlayers: number = 5;

  constructor(haloCompetitionData: HaloCompetitionConstructor) {
    super({ ...haloCompetitionData, game: "Halo Infinite" });

    this.initialPlayersData = [];
  }

  protected calculateScore({ totalScore, timePlayed, playerIndex }: any): number {
    const scoreConstant = 1;
    const newContributionScore = totalScore - this.initialPlayersData[playerIndex].totalScore;
    const newTimePlayed = timePlayed - this.initialPlayersData[playerIndex].timePlayed;
    const newScore = (newContributionScore * scoreConstant) / newTimePlayed;

    this.initialPlayersData[playerIndex].timePlayed = timePlayed;
    this.initialPlayersData[playerIndex].totalScore = totalScore;

    return newScore;
  }

  protected calculatePrimaryScore({ medals, playerIndex }: any): number {
    const newMedals = medals - this.initialPlayersData[playerIndex].medals;
    this.initialPlayersData[playerIndex].medals = medals;

    return newMedals;
  }

  protected calculateSecondaryScore({ kills, playerIndex }: any): number {
    const newKills = kills - this.initialPlayersData[playerIndex].kills;
    this.initialPlayersData[playerIndex].kills = kills;

    return newKills;
  }

  protected calculateTertiaryScore({ assists, playerIndex }: any): number {
    const newAssists = assists - this.initialPlayersData[playerIndex].assists;
    this.initialPlayersData[playerIndex].assists = assists;

    return newAssists;
  }

  protected calculateQuaternaryScore({ shotsLanded, playerIndex }: any): number {
    const newShotsLanded = shotsLanded - this.initialPlayersData[playerIndex].shotsLanded;
    this.initialPlayersData[playerIndex].shotsLanded = shotsLanded;

    return newShotsLanded;
  }

  protected async waitingToStartToInProgressMiddleware() {
    const zeroInitialStats: HaloPlayerCompetitionData = {
      kills: 0,
      medals: 0,
      assists: 0,
      shotsLanded: 0,
      timePlayed: 1, // used as a divider cant be 0 returns NaN and breaks stuff
      totalScore: 0,
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

  protected async getCurrentPlayersData(): Promise<HaloPlayerCompetitionData[]> {
    const retrievedStats: HaloPlayerCompetitionData[] = [];

    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        const initialPlayerData = this.initialPlayersData[i];

        const result = await lib.halo.infinite["@0.3.8"].stats["service-record"].multiplayer({
          gamertag: player.gameAccountInfo.xboxData.xboxGamerTag, // required
          filter: "matchmade:pvp"
        });

        const { medals, kills, assists } = result.data.core.summary;
        const shotsLanded = result.data.core.shots.landed;
        const timePlayed = result.data.time_played.seconds;
        const totalScore = result.data.core.total_score;

        console.log(
          `${player.name} initial: ${this.initialPlayersData[i].timePlayed} < current: ${timePlayed}`
        );
        const newStats = initialPlayerData.timePlayed < timePlayed;

        if (newStats) {
          const primaryScore = this.calculatePrimaryScore({ medals, playerIndex: i });
          const secondaryScore = this.calculateSecondaryScore({ kills, playerIndex: i });
          const tertiaryScore = this.calculateTertiaryScore({ assists, playerIndex: i });
          const quaternaryScore = this.calculateQuaternaryScore({
            shotsLanded,
            playerIndex: i
          });

          const score = this.calculateScore({
            timePlayed,
            totalScore,
            playerIndex: i
          });

          this.players[i].updateScore({
            primaryStatScore: primaryScore,
            secondaryStatScore: secondaryScore,
            tertiaryStatScore: tertiaryScore,
            quaternaryStatScore: quaternaryScore,
            score: score
          });

          retrievedStats[i] = {
            medals,
            kills,
            assists,
            shotsLanded,
            timePlayed,
            totalScore,
            playerId: player.dbId
          };
        }
      }

      this.rankPlayers();
      const normalizedPlayers = this.normalizePlayersForFrontEnd();
      this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-newStats`, normalizedPlayers);
    } catch (e) {
      console.log(e);
      console.log("halo code");
    }

    return retrievedStats;
  }

  protected generateGetUserReqUrl(data: any): string {
    return `not needed for halo`;
  }

  protected generateGetPlayerLastGamesReqUrl(userReqData): string {
    return "not needed for halo";
  }
}

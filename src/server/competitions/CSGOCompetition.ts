import axios from "axios";
import { axiosInstance } from "../../lib";
import { Competition, CompetitionConstructor } from "../competition";

type CSGOCompetitionConstructor = CompetitionConstructor;

const API_KEY = process.env.STEAM_DEV_API_KEY;
const CSGO_STEAM_APP_ID = 730;

type CSGOPlayerCompetitionData = {
  kills: number;
  damage: number;
  headshots: number;
  moneyEarned: number;
  timePlayed: number;
  contributionScore: number;
  playerId: string;
};

export class CSGOCompetition extends Competition {
  protected GET_PLAYERS_DATA_INTERVAL: number = 1 * 60 * 1000;

  protected minPlayers: number = 1;
  protected maxPlayers: number = 5;

  private initialPlayersData: CSGOPlayerCompetitionData[];

  constructor(csgoCompetitionData: CSGOCompetitionConstructor) {
    super({ ...csgoCompetitionData, game: "CS:GO" });

    this.initialPlayersData = [];
  }

  protected calculateScore({ contributionScore, timePlayed, playerIndex }: any): number {
    const scoreConstant = 1000;
    const newContributionScore =
      contributionScore - this.initialPlayersData[playerIndex].contributionScore;
    const newTimePlayed = timePlayed - this.initialPlayersData[playerIndex].timePlayed;
    const newScore = (newContributionScore * scoreConstant) / newTimePlayed;

    this.initialPlayersData[playerIndex].timePlayed = timePlayed;
    this.initialPlayersData[playerIndex].contributionScore = contributionScore;

    return newScore;
  }

  protected calculatePrimaryScore({ kills, playerIndex }: any): number {
    const newKills = kills - this.initialPlayersData[playerIndex].kills;
    this.initialPlayersData[playerIndex].kills = kills;

    return newKills;
  }

  protected calculateSecondaryScore({ damage, playerIndex }: any): number {
    const newDamage = damage - this.initialPlayersData[playerIndex].damage;
    this.initialPlayersData[playerIndex].damage = damage;

    return newDamage;
  }

  protected calculateTertiaryScore({ headshots, playerIndex }: any): number {
    const newHeadshots = headshots - this.initialPlayersData[playerIndex].headshots;
    this.initialPlayersData[playerIndex].headshots = headshots;

    return newHeadshots;
  }

  protected calculateQuaternaryScore({ moneyEarned, playerIndex }: any): number {
    const newMoneyEarned = moneyEarned - this.initialPlayersData[playerIndex].moneyEarned;
    this.initialPlayersData[playerIndex].moneyEarned = moneyEarned;

    return newMoneyEarned;
  }

  protected async waitingToStartToInProgressMiddleware() {
    const zeroInitialStats = {
      kills: 0,
      damage: 0,
      headshots: 0,
      moneyEarned: 0,
      timePlayed: 1, // used as a divider cant be 0 returns NaN and breaks stuff
      contributionScore: 0,
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

  protected async getCurrentPlayersData(): Promise<CSGOPlayerCompetitionData[]> {
    const retrievedStats: CSGOPlayerCompetitionData[] = [];

    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];

        const newMatchDataRes = await axiosInstance.get(player.getPlayerAccountDetailAPIUrl);
        // const newMatchDataRes = await axiosInstance.get("http://localhost:3001/api/" + i);

        const { playerstats } = newMatchDataRes.data;

        const kills = playerstats.stats.find(({ name }) => name === "total_kills").value;
        const damage = playerstats.stats.find(({ name }) => name === "total_damage_done").value;
        const headshots = playerstats.stats.find(
          ({ name }) => name === "total_kills_headshot"
        ).value;
        const moneyEarned = playerstats.stats.find(
          ({ name }) => name === "total_money_earned"
        ).value;
        const timePlayed = playerstats.stats.find(({ name }) => name === "total_time_played").value;
        const contributionScore = playerstats.stats.find(
          ({ name }) => name === "total_contribution_score"
        ).value;

        const newStats = this.initialPlayersData[i].timePlayed < timePlayed;

        if (newStats) {
          player.updateScore({
            primaryStatScore: this.calculatePrimaryScore({ kills, playerIndex: i }),
            secondaryStatScore: this.calculateSecondaryScore({ damage, playerIndex: i }),
            tertiaryStatScore: this.calculateTertiaryScore({ headshots, playerIndex: i }),
            quaternaryStatScore: this.calculateQuaternaryScore({
              moneyEarned,
              playerIndex: i
            }),
            score: this.calculateScore({
              contributionScore,
              timePlayed,
              playerIndex: i
            })
          });
        }

        retrievedStats[i] = {
          contributionScore,
          damage,
          headshots,
          kills,
          moneyEarned,
          timePlayed,
          playerId: player.dbId
        };

        this.rankPlayers();
        const normalizedPlayers = this.normalizePlayersForFrontEnd();

        this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-newStats`, normalizedPlayers);
      }
    } catch (e) {
      console.log(e);
      console.log("csgo code");
    }

    return retrievedStats;
  }

  protected generateGetUserReqUrl(data: any): string {
    const steamid = data?.steamData?.steamid ?? " ";

    return `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${CSGO_STEAM_APP_ID}&key=${API_KEY}&steamid=${steamid}`;
  }

  protected generateGetPlayerLastGamesReqUrl(userReqData): string {
    return "not needed for CS:GO";
  }
}

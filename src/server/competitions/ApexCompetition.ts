// import { axiosInstance } from "../../lib";
// import { Competition, CompetitionConstructor } from "../competition";

// type ApexCompetitionConstructor = CompetitionConstructor;

// const API_KEY = process.env.PUBG_API_KEY;

// type ApexPlayerCompetitionData = {
//   kills: number;
//   damage: number;
//   revives: number;
//   sniperKills: number;
// };

// export class ApexCompetition extends Competition {
//   private initialPlayersData: ApexPlayerCompetitionData[] = [];

//   protected minPlayers: number = 2;
//   protected maxPlayers: number = 5;

//   constructor(apexCompetitionData: ApexCompetitionConstructor) {
//     super({ ...apexCompetitionData, game: "Apex Legends" });
//   }

//   protected calculateScore({ damage, playerIndex }: any): number {
//     const scoreConstant = 11000;

//     return (damage - this.initialPlayersData[playerIndex].damage) * scoreConstant;
//   }

//   protected calculatePrimaryScore({ kills, playerIndex }: any): number {
//     return kills - this.initialPlayersData[playerIndex].kills;
//   }

//   protected calculateSecondaryScore({ damage, playerIndex }: any): number {
//     return damage - this.initialPlayersData[playerIndex].damage;
//   }

//   protected calculateTertiaryScore({ revives, playerIndex }: any): number {
//     return revives - this.initialPlayersData[playerIndex].revives;
//   }

//   protected calculateQuaternaryScore({ sniperKills, playerIndex }: any): number {
//     return sniperKills - this.initialPlayersData[playerIndex].sniperKills;
//   }

//   protected async waitingToStartToInProgressMiddleware() {
//     const zeroInitialStats: ApexPlayerCompetitionData = {
//       kills: 0,
//       damage: 0,
//       revives: 0,
//       sniperKills: 0
//     };

//     for (let i = 0; i < this.players.length; i++) {
//       this.initialPlayersData.push(zeroInitialStats);
//     }

//     const initialData = await this.getCurrentPlayersData();

//     for (let i = 0; i < this.players.length; i++) {
//       this.initialPlayersData[i].kills = initialData?.kills ?? 0;
//       this.initialPlayersData[i].damage = initialData?.damage ?? 0;
//       this.initialPlayersData[i].revives = initialData?.revives ?? 0;
//       this.initialPlayersData[i].sniperKills = initialData?.sniperKills ?? 0;

//       this.players[i].updateScore({
//         primaryStatScore: -this.players[i].stats.primaryStatScore.value,
//         secondaryStatScore: -this.players[i].stats.secondaryStatScore.value,
//         tertiaryStatScore: -this.players[i].stats.tertiaryStatScore.value,
//         quaternaryStatScore: -this.players[i].stats.quaternaryStatScore.value,
//         score: -this.players[i].stats.score
//       });

//       this.players[i].playedMatchesIds.push("0");
//     }
//   }

//   protected async getCurrentPlayersData(): Promise<ApexPlayerCompetitionData | null> {
//     try {
//       for (let i = 0; i < this.players.length; i++) {
//         const player = this.players[i];

//         const newMatchDataRes = await axiosInstance.get(player.getPlayerAccountDetailAPIUrl, {
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//             accept: "application/vnd.api+json"
//           }
//         });

//         const { killsStats, damageStats } = newMatchDataRes.data.data.segments.stats;

//         const kills = killsStats.value;
//         const damage = damageStats.value;

//         const newStats =
//           player.stats.secondaryStatScore.value + this.initialPlayersData[i].damage < damage;

//         if (newStats) {
//           player.updateScore({
//             primaryStatScore: this.calculatePrimaryScore({ kills, playerIndex: i }),
//             secondaryStatScore: this.calculateSecondaryScore({ damage, playerIndex: i }),
//             tertiaryStatScore: this.calculateTertiaryScore({ damage, playerIndex: i }),
//             quaternaryStatScore: this.calculateQuaternaryScore({
//               damage,
//               playerIndex: i
//             }),
//             score: this.calculateScore({ damage, playerIndex: i })
//           });

//           console.log(this.players[0].stats);

//           this.rankPlayers()();
//           const normalizedPlayers = this.normalizePlayersForFrontEnd();

//           this.socket
//             .to(this.socketRoomId)
//             .emit(`${this.socketRoomId}-newStats`, normalizedPlayers);

//           return {
//             kills,
//             damage,
//             revives: damage,
//             sniperKills: damage
//           };
//         }
//       }
//     } catch (e) {
//       console.log(e);
//       console.log("pubg code");
//     }

//     return null;
//   }

//   protected generateGetUserReqUrl({ username }: { username: string }): string {
//     return `https://public-api.tracker.gg/v2/apex/standard/profile/origin/${username}`;
//   }

//   protected generateGetPlayerLastGamesReqUrl(userReqData): string {
//     return "not needed for pubg";
//   }
// }

export {};

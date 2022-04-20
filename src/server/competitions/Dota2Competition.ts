import axios from "axios";
import { Competition, CompetitionConstructor } from "../competition";

import dota2Api from "dota2-api";
import SteamID from "steamid";

type Dota2CompetitionConstructor = CompetitionConstructor;

const API_KEY = process.env.STEAM_DEV_API_KEY;
const GET_LAST_X_GAMES = 5;

const Dota2APIProvider = dota2Api.create(API_KEY);

const sleep = (timeout: number) => new Promise(res => setTimeout(res, 2000));

// FIXME:  CHECK FOR GAME MODE AND FOR LOBBY_TYPE IF ITS A BOTS GAME!!!!
// human_players === 10

export class Dota2Competition extends Competition {
  protected GET_PLAYERS_DATA_INTERVAL = 1 * 60 * 1000;
  protected minPlayers = 2;
  protected maxPlayers = 5;

  constructor(dota2CompetitionData: Dota2CompetitionConstructor) {
    super({ ...dota2CompetitionData, game: "DOTA" });
  }

  protected calculateScore({
    xpPerMin,
    goldPerMin
  }: {
    xpPerMin: number;
    goldPerMin: number;
  }): number {
    return (xpPerMin * goldPerMin) / 1000;
  }

  protected calculatePrimaryScore({ kills }: { kills: number }): number {
    return kills;
  }

  protected calculateSecondaryScore({ lastHits }: { lastHits: number }): number {
    return lastHits;
  }

  protected calculateTertiaryScore({ denies }: { denies: number }): number {
    return denies;
  }

  protected calculateQuaternaryScore({ netWorth }: { netWorth: number }): number {
    return netWorth;
  }

  protected async getCurrentPlayersData() {
    try {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];

        const steamID32 = new SteamID(player.gameAccountInfo.steamData.steamid);

        if (i % 4 === 0) {
          await sleep(2000);
        }

        const matchHistory = await Dota2APIProvider.getMatchHistory({
          account_id: steamID32.accountid
        });

        // console.log(player.name);
        // console.log(matchHistory.result);

        if (matchHistory.result.status !== 15) {
          const lastMatch = matchHistory.result.matches[0];

          const isNewMatch = lastMatch?.match_id?.toString() !== player.lastMatchId;

          if (isNewMatch) {
            player.lastMatchId = lastMatch.match_id.toString();

            const newMatchDataRes = await Dota2APIProvider.getMatchDetails({
              match_id: player.lastMatchId
            });

            const matchTimeData = {
              matchStartTime: newMatchDataRes.result.start_time * 1000,
              matchEndTime:
                newMatchDataRes.result.start_time * 1000 + newMatchDataRes.result.duration * 1000
            };

            if (this.checkIfMatchIsInCompetitionTimeframe(matchTimeData)) {
              if (!player.playedMatchesIds && player.lastMatchId) {
                player.playedMatchesIds = [player.lastMatchId];
              } else {
                (player.playedMatchesIds as string[]).push(player.lastMatchId);
              }

              const playerMatchData = newMatchDataRes.result.players.find(
                ({ account_id }) => account_id === steamID32.accountid
              );

              const { kills, last_hits, denies, net_worth, xp_per_min, gold_per_min } =
                playerMatchData;

              player.updateScore({
                primaryStatScore: this.calculatePrimaryScore({ kills }),
                secondaryStatScore: this.calculateSecondaryScore({ lastHits: last_hits }),
                tertiaryStatScore: this.calculateTertiaryScore({ denies }),
                quaternaryStatScore: this.calculateQuaternaryScore({ netWorth: net_worth }),
                score: this.calculateScore({
                  xpPerMin: xp_per_min,
                  goldPerMin: gold_per_min
                })
              });
            }
          }
        }
      }

      this.rankPlayers();
      const normalizedPlayers = this.normalizePlayersForFrontEnd();

      this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-newStats`, normalizedPlayers);
    } catch (e) {
      console.log(e);
      console.log("00002 dotacode");
    }
  }

  protected waitingToStartToInProgressMiddleware() {
    const wellItsNotNeeded = "for now";
  }

  protected generateGetPlayerLastGamesReqUrl() {
    return "not needed for now";
  }

  protected generateGetUserReqUrl() {
    return " not needed for now ";
  }
}

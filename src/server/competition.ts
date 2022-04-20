import {
  moveCompetitionFromToStartToInProgress,
  moveCompetitionFromInProgressToFinished,
  moveCompetitionFromToStartToFinished,
  CompetitionState,
  updateUserCompetitionsOnCompetitionFinished,
  competitionAborted
} from "../lib";

import { Server as SocketIOServer } from "socket.io";
import { Player, PlayerStats } from "./player";
import { ICompetitionPlayer, IGame } from "../types";

export type CompetitionConstructor = CompetitionState & {
  startsAt: number;
  id: string;
  duration: 1 | 2 | 3;
  state: "finished" | "inProgress" | "waitingToStart" | "aborted";
  socket: SocketIOServer;
  name: string;
  players: ICompetitionPlayer[];
  removeCompetitionFromServerArray: any;
};

export abstract class Competition {
  protected GET_PLAYERS_DATA_INTERVAL: number = 0.1 * 60 * 1000;
  protected abstract minPlayers: number;
  protected abstract maxPlayers: number;

  private name: string;

  // remove competition from state.toStartIds, playerid.competitions.current, delete competition document and from server array

  public id: string;
  private duration: 1 | 2 | 3;
  private startsAt: number;
  private state: "finished" | "inProgress" | "waitingToStart" | "aborted";
  private startsInTimeout: number;
  private endsInTimeout: number;

  protected players: Player[] = [];
  protected game: IGame["name"];
  protected socket: SocketIOServer;
  protected socketRoomId: string;

  private removeCompetitionFromServerArray: (competitionId: string) => void;

  constructor({
    id,
    duration,
    startsAt,
    state,
    socket,
    name,
    players,
    game,
    removeCompetitionFromServerArray
  }: CompetitionConstructor) {
    this.id = id;
    this.duration = duration;
    this.state = state;
    this.startsAt = startsAt;
    this.socket = socket;
    this.socketRoomId = `competition:${id}`;
    this.name = name;
    this.game = game;
    this.removeCompetitionFromServerArray = removeCompetitionFromServerArray;
    this.startsInTimeout = this.setStartsInTimeout();
    this.endsInTimeout = this.setEndsInTimeout();

    players.forEach(player => this.addPlayer(player));
  }

  public initializeCompetition() {
    this.setInitialState();
    this.initializeSocketConnection();
  }

  private initializeSocketConnection() {
    this.socket.on("connection", userSocket => {
      userSocket.on(`joinCompetitionRoom:${this.id}`, room => {
        userSocket.join(room);

        console.log(`socket connection - ${this.socketRoomId}-${this.state}`);
        const normalizedPlayers = this.players
          .map(player => player.normalizePlayerDataForCompetitionStats())
          .sort((playerA, playerB) => playerB.stats.rank - playerA.stats.rank);
        userSocket.emit(`${this.socketRoomId}-${this.state}`, normalizedPlayers);
      });
    });
  }

  private async setInitialState() {
    const competitionWaitingToStart = this.startsInTimeout > 0 && this.state === "waitingToStart";

    const competitionIsInProgress =
      this.endsInTimeout >= 0 &&
      this.startsInTimeout <= 0 &&
      (this.state === "inProgress" || this.state === "waitingToStart");

    const competitionFinished = this.startsInTimeout < 0 && this.endsInTimeout < 0;

    // const competitionAborted = this.startsInTimeout < 0 && this.players.length < this.minPlayers;

    // if (competitionAborted) {
    //   this.stateWaitingToStartToAborted();
    // }

    if (competitionFinished) {
      console.log("finished", this.id);

      if (this.state === "inProgress") this.stateInProgressToFinished();
      if (this.state === "waitingToStart") this.stateWaitingToStartToFinished();

      return;
    }

    if (competitionIsInProgress) {
      console.log("in progress", this.id);

      this.stateWaitingToStartToInProgress();

      // const competitionAborted = this.startsInTimeout < 0 && this.players.length < this.minPlayers;

      // if (competitionAborted) {
      //   this.stateWaitingToStartToAborted();
      //   return;
      // }

      // await this.waitingToStartToInProgressMiddleware();

      // this.socketToInProgress();
      // await new Promise((res, rej) => setTimeout(() => res(true), 3000));

      // const getPlayerDataInterval = setInterval(async () => {
      //   await this.getCurrentPlayersData();
      // }, this.GET_PLAYERS_DATA_INTERVAL);

      // setTimeout(() => {
      //   this.stateInProgressToFinished();
      //   clearInterval(getPlayerDataInterval);
      // }, this.endsInTimeout);

      // this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-inProgress`, normalizedPlayers);
      // setTimeout(() => this.stateInProgressToFinished(), this.endsInTimeout);

      return;
    }

    if (competitionWaitingToStart) {
      console.log("waiting", this.id);

      setTimeout(() => {
        this.stateWaitingToStartToInProgress();
      }, this.startsInTimeout);

      return;
    }
  }

  private setStartsInTimeout() {
    const now = new Date();

    return this.startsAt.valueOf() - now.valueOf();
  }

  private setEndsInTimeout() {
    const now = new Date();
    const endsAtDate = this.startsAt + this.duration * 3600 * 1000; //new Date(this.startsAt).setHours(this.startsAt.getHours() + this.duration);

    // FIXME: TO RESTORE COMPETITIONS FOR PRODUCTION DELETE THIS
    return endsAtDate.valueOf() - now.valueOf();
  }

  private socketToInProgress() {
    console.log("from start to progress: emitting", `${this.socketRoomId}-inProgress`);
    const normalizedPlayers = this.players
      .map(player => player.normalizePlayerDataForCompetitionStats())
      .sort((playerA, playerB) => playerB.stats.rank - playerA.stats.rank);

    this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-inProgress`, normalizedPlayers);
  }

  private socketToFinished() {
    console.log("from progress to finished: emitting", `${this.socketRoomId}-finished`);
    const normalizedPlayers = this.players
      .map(player => player.normalizePlayerDataForCompetitionStats())
      .sort((playerA, playerB) => playerB.stats.rank - playerA.stats.rank);

    this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-finished`, normalizedPlayers);
  }

  private socketToAborted() {
    this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-aborted-not-enough-players`);
  }

  private async stateWaitingToStartToAborted() {
    await this.dbWaitingToStartToAborted();
    this.socketToAborted();
    this.removeCompetitionFromServerArray(this.id);
    this.state = "aborted";
  }

  private async stateWaitingToStartToInProgress() {
    // const competitionAborted = this.startsInTimeout < 0 && this.players.length < this.minPlayers;

    // if (competitionAborted) {
    //   this.stateWaitingToStartToAborted();
    //   return;
    // }

    await this.waitingToStartToInProgressMiddleware();

    await this.dbWaitingToStartToInProgress();
    this.socketToInProgress();
    this.state = "inProgress";

    const getPlayerDataInterval = setInterval(async () => {
      await this.getCurrentPlayersData();
    }, this.GET_PLAYERS_DATA_INTERVAL);

    setTimeout(() => {
      this.stateInProgressToFinished();
      clearInterval(getPlayerDataInterval);
    }, this.endsInTimeout);
  }

  private async stateInProgressToFinished() {
    await this.dbInProgressToFinished();
    this.socketToFinished();
    this.state = "finished";
  }

  private async stateWaitingToStartToFinished() {
    await this.dbWaitingToStartToFinished();
    this.socketToFinished();
    this.state = "finished";
  }

  private async dbWaitingToStartToInProgress() {
    const competitionPayload = this.generateCompetitionDbPayload();

    try {
      await moveCompetitionFromToStartToInProgress(competitionPayload);
      console.log(`db ${this.id} from to start to in progress`);
    } catch (e) {
      console.log("error in #dbToinProgress");
      console.log(e);
    }
  }

  private async dbInProgressToFinished() {
    const competitionPayload: CompetitionState = this.generateCompetitionDbPayload();

    try {
      await moveCompetitionFromInProgressToFinished(competitionPayload);

      console.log(`db ${this.id} from to in progress to finished`);
    } catch (e) {
      console.log("error in #dbinprogresstofinished");
      console.log(e);
    }

    try {
      for (let player of this.players) {
        await updateUserCompetitionsOnCompetitionFinished(player.dbId, competitionPayload);
      }
    } catch (e) {
      console.log("error in updating player competitions on finished");
      console.log(e);
    }
  }

  private async dbWaitingToStartToAborted() {
    await competitionAborted(this.generateCompetitionDbPayload());
  }

  private generateCompetitionDbPayload(): CompetitionState {
    return {
      id: this.id,
      state: this.state,
      startsAt: this.startsAt,
      duration: this.duration,
      game: this.game,
      name: this.name,
      players: this.players
        .map(playerProps => ({
          id: playerProps.dbId,
          username: playerProps.name,
          image: playerProps.userAvatarImgSrc,
          playedMatchesIds: playerProps.playedMatchesIds,
          stats: playerProps.stats,
          gameAccountInfo: playerProps.gameAccountInfo,
          monthlyBest: 0,
          recentAverage: 0,
          primaryGame: playerProps.primaryGame
        }))
        .sort((playerA, playerB) => playerA?.stats?.rank - playerB?.stats?.rank)
    };
  }

  private async dbWaitingToStartToFinished() {
    const competitionPayload: CompetitionState = this.generateCompetitionDbPayload();

    try {
      await moveCompetitionFromToStartToFinished(competitionPayload);
      console.log(`db ${this.id} from to start to finished`);
    } catch (e) {
      console.log("error in #dbtofinished");
      console.log(e);
    }
  }

  public addPlayer(playerData: ICompetitionPlayer) {
    const newPlayer = new Player({
      dbId: playerData.id,
      gameAccountInfo: playerData.gameAccountInfo,
      name: playerData.username,
      userAvatarImgSrc: playerData.image,
      stats: playerData.stats as PlayerStats,
      getPlayerAccountDetailAPIUrl: this.generateGetUserReqUrl(playerData.gameAccountInfo as any),
      getPlayerLastMatchesAPIUrl: this.generateGetPlayerLastGamesReqUrl(
        playerData.gameAccountInfo as any
      ),
      primaryGame: playerData.primaryGame
    });

    this.players.push(newPlayer);

    this.socket
      .to(this.socketRoomId)
      .emit(`${this.socketRoomId}-playerJoined`, this.players.length);
  }

  public removePlayer(playerId) {
    const playerToRemoveIndex = this.players.findIndex(({ dbId }) => dbId === playerId);

    this.players.splice(playerToRemoveIndex);
    // FIXME: Also in database
    // And endpoint needed
  }

  protected checkIfMatchIsInCompetitionTimeframe(matchTimeData: {
    matchStartTime: number;
    matchEndTime: number;
  }) {
    return (
      this.startsAt.valueOf() <= matchTimeData.matchStartTime &&
      matchTimeData.matchEndTime <= this.startsAt.valueOf() + this.duration * 60 * 60 * 1000
    );
  }

  protected sendNewPlayerDataToFrontEnd() {
    let tempPlayers = [...this.players].sort(
      (playerA, playerB) => playerB.stats.score - playerA.stats.score
    );

    tempPlayers.forEach((player, i) => (player.stats.rank = i + 1));

    this.players.forEach((player, i) => (player.stats.rank = tempPlayers[i].stats.rank));

    const normalizedPlayers = tempPlayers.map(player =>
      player.normalizePlayerDataForCompetitionStats()
    );

    // const normalizedPlayers = this.normalizePlayersForFrontEnd();

    this.socket.to(this.socketRoomId).emit(`${this.socketRoomId}-newStats`, normalizedPlayers);
  }

  protected rankPlayers() {
    const tempPlayers = [...this.players].sort(
      (playerA, playerB) => playerB.stats.score - playerA.stats.score
    );

    tempPlayers.forEach((tempPlayer, i) => {
      const indexInMainPlayers = this.players.findIndex(({ dbId }) => dbId === tempPlayer.dbId);

      this.players[indexInMainPlayers].stats.rank = i + 1;
    });
  }

  protected normalizePlayersForFrontEnd() {
    return this.players.map(player => player.normalizePlayerDataForCompetitionStats());
  }

  // TODO: scoreData: LoLScoreInput | DotaScoreInput etc, typify all of these
  // Move the whole logic in this class
  // Derivative classes will just give us what we need to run the competitions engine
  protected abstract waitingToStartToInProgressMiddleware();
  protected abstract calculateScore(scoreData: any): number;
  protected abstract calculatePrimaryScore(scoreData: any): number;
  protected abstract calculateSecondaryScore(scoreData: any): number;
  protected abstract calculateTertiaryScore(scoreData: any): number;
  protected abstract calculateQuaternaryScore(scoreData: any): number;
  protected abstract getCurrentPlayersData(): void | any;
  protected abstract generateGetUserReqUrl(userReqData: any): string;
  protected abstract generateGetPlayerLastGamesReqUrl(userReqData: any): string;
}

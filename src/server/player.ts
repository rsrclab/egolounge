import { IGame } from "~/types";

export interface IPlayer {
  dbId: string;
  name: string;
  userAvatarImgSrc: string;
  getPlayerAccountDetailAPIUrl: string;
  getPlayerLastMatchesAPIUrl: string;
  lastMatchId: string;
  gameAccountInfo: any;
  playedMatchesIds: string[];
  primaryGame: IGame["name"];
  stats: {
    primaryStatScore: ScoreType;
    secondaryStatScore: ScoreType;
    tertiaryStatScore: ScoreType;
    quaternaryStatScore: ScoreType;
  };
}

export type ScoreType = {
  name: string;
  value: number;
};

export type PlayerStats = {
  score: number;
  rank: number;
  primaryStatScore: ScoreType;
  secondaryStatScore: ScoreType;
  tertiaryStatScore: ScoreType;
  quaternaryStatScore: ScoreType;
};

export class Player implements Omit<IPlayer, "getPlayerAccountDetailAPIUrl"> {
  private _dbId: string;
  private _name: string;
  private _stats: PlayerStats;
  private _userAvatarImgSrc: string;
  private _gameAccountInfo: any;
  private _playedMatchesIds: string[];
  private _lastMatchId: string;
  private _getPlayerAccountDetailAPIUrl: string;
  private _getPlayerLastMatchesAPIUrl: string;
  private _getPlayerMatchStatsURL;
  private _primaryGame: IGame["name"];

  public get primaryGame(): any {
    return this._primaryGame;
  }
  public set primaryGame(value: any) {
    this._primaryGame = value;
  }

  public get stats(): PlayerStats {
    return this._stats;
  }

  public get gameAccountInfo(): any {
    return this._gameAccountInfo;
  }
  public set gameAccountInfo(value: any) {
    this._gameAccountInfo = value;
  }

  public get userAvatarImgSrc(): string {
    return this._userAvatarImgSrc;
  }
  public set userAvatarImgSrc(value: string) {
    this._userAvatarImgSrc = value;
  }

  public get playedMatchesIds(): string[] {
    return this._playedMatchesIds;
  }
  public set playedMatchesIds(value: string[]) {
    this._playedMatchesIds = value;
  }

  public get getPlayerAccountDetailAPIUrl(): string {
    return this._getPlayerAccountDetailAPIUrl;
  }
  public set getPlayerAccountDetailAPIUrl(value: string) {
    this._getPlayerAccountDetailAPIUrl = value;
  }

  public get getPlayerLastMatchesAPIUrl(): string {
    return this._getPlayerLastMatchesAPIUrl;
  }
  public set getPlayerLastMatchesAPIUrl(value: string) {
    this._getPlayerLastMatchesAPIUrl = value;
  }

  get getPlayerMatchStatsUrl() {
    return this._getPlayerMatchStatsURL;
  }
  set getPlayerMatchStatsUrl(theMatchStatsUrl: (matchId: string) => string) {
    this._getPlayerMatchStatsURL = theMatchStatsUrl("");
  }

  public get dbId(): string {
    return this._dbId;
  }
  public set dbId(value: string) {
    this._dbId = value;
  }

  public get name() {
    return this._name;
  }
  public set name(theName: string) {
    this._name = theName;
  }

  public get lastMatchId() {
    return this._lastMatchId;
  }
  public set lastMatchId(theLastMatchId: string) {
    this._lastMatchId = theLastMatchId;
  }

  constructor({
    dbId,
    name,
    userAvatarImgSrc,
    stats,
    gameAccountInfo,
    getPlayerLastMatchesAPIUrl,
    getPlayerAccountDetailAPIUrl,
    primaryGame
  }: Omit<IPlayer, "lastMatchId" | "playedMatchesIds">) {
    this._dbId = dbId;
    this._name = name;
    this._gameAccountInfo = gameAccountInfo;
    this._userAvatarImgSrc = userAvatarImgSrc;
    this._stats = {
      score: 0,
      rank: 0,
      primaryStatScore: stats.primaryStatScore,
      secondaryStatScore: stats.secondaryStatScore,
      tertiaryStatScore: stats.tertiaryStatScore,
      quaternaryStatScore: stats.quaternaryStatScore
    };
    this._getPlayerAccountDetailAPIUrl = getPlayerAccountDetailAPIUrl;
    this._getPlayerLastMatchesAPIUrl = getPlayerLastMatchesAPIUrl;
    this._lastMatchId = "";
    this._playedMatchesIds = [];
    this._primaryGame = primaryGame;
  }

  public getPlayerMatchStatsURL(matchId: string) {
    return this._getPlayerMatchStatsURL(matchId);
  }

  public updateScore(playerScores: {
    primaryStatScore: number;
    secondaryStatScore: number;
    tertiaryStatScore: number;
    quaternaryStatScore: number;
    score: number;
  }) {
    this._stats.primaryStatScore.value += playerScores.primaryStatScore;
    this._stats.secondaryStatScore.value += playerScores.secondaryStatScore;
    this._stats.tertiaryStatScore.value += playerScores.tertiaryStatScore;
    this._stats.quaternaryStatScore.value += playerScores.quaternaryStatScore;
    this._stats.score += playerScores.score;
  }

  public normalizePlayerDataForCompetitionStats() {
    return {
      id: this.dbId,
      image: this.userAvatarImgSrc,
      playedMatchesIds: this.playedMatchesIds,
      stats: this.stats,
      username: this.name
    };
  }
}

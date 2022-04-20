import { IGame } from ".";

export interface ICompetitionPlayer {
  id: string;
  username: string;
  image: string;
  stats: IGame["stats"];
  monthlyBest: number;
  recentAverage: number;
  primaryGame: IGame["name"];
  gameAccountInfo: any;
}

export interface ICompetitionFormInput {
  players: [ICompetitionPlayer];
  startsAt: number;
  startTime: number;
  duration: 1 | 2 | 3;
  game: IGame["name"];
  numberOfPlayers: 1 | number;
  isOver: boolean;
  name: string;
  state: "waitingToStart" | "inProgress" | "finished";
  amPm: string;
}

export interface ICompetitionDb extends ICompetitionFormInput {
  id: string;
}
export interface ICompetition extends Omit<ICompetitionDb, "players"> {
  players: ICompetitionPlayer[];
}

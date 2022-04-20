export interface ICompetitionStats {
  startsAt: Date;
  duration: string;
  name: string;
  id: string;
  game: string;
  ownerUsername: string;
  playersCount: number;
  players: {
    id: string;
    username: string;
    recentAverage: number | string;
    monthlyBest: number | string;
    primaryGame: string | null | undefined;
    avatar: string | null | undefined;
  }[];
}

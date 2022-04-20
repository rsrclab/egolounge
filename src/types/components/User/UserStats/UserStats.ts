export interface UserStatsProps {
    user: {
      username: string;
      avatarSrc: string;
      mostPlayedGameImgSrc: string;
      competitionsCount: number;
      competitionWins: number;
      competitionTop3Count: number;
      competitionBestScore: number;
    };
    lastCompetition: {
      competitionName: string;
      competitionDate: string;
      competitionGameImageSrc: string;
      competitionPlayers: {
        playerImgSrc: string;
      }[];
    };
  }
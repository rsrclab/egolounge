import { ICompetitionFormInput, IUser, IGame, ICompetition, ICompetitionPlayer } from "~/types";
import { games } from "../data";

export const getNextSevenDays = (futureDays: number): { value: Date; label: string }[] => {
  const today = new Date();

  return Array(futureDays)
    .fill(null)
    .map((_, i) => {
      const newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      if (i === 0) {
        //set hours only for the first day
        newDate.setHours(today.getHours());
      }

      return {
        value: newDate,
        label: newDate.toDateString().substring(4, newDate.toDateString().length - 4)
      };
    });
};

export const createCompetitionDefaultPlayer = ({
  user,
  gameToCompeteIn
}: {
  user: IUser;
  gameToCompeteIn: Pick<IGame, "shorthand" | "stats">;
}): ICompetitionPlayer => {
  return {
    id: user.id as string,
    username: user.username,
    image: user.image as string,
    gameAccountInfo: user?.gameAccounts[gameToCompeteIn?.shorthand],
    primaryGame: user.primaryGame as IGame["name"],
    recentAverage:
      (user.competitions?.lastTenRanks &&
        user.competitions.lastTenRanks
          .slice(0, 10)
          .reduce((currentAverage, currentRank) => currentAverage + currentRank, 0) / 10) ||
      0,
    monthlyBest: user.competitions?.bestScore || 0,
    stats: {
      ...(gameToCompeteIn?.stats as IGame["stats"]),
      score: 0,
      rank: 0
    }
  };
};

export const createJoiningCompetitionDefaultPlayer = ({
  user,
  duration,
  gameName,
  competitionName,
  startsAt,
  startTime,
  amPm
}: {
  user: IUser;
  duration: string;
  gameName: IGame["name"];
  competitionName: string;
  startsAt: number;
  amPm: string;
  startTime: number;
}): ICompetitionFormInput => {
  const gameToCompeteIn = games.find(({ name }) => name === gameName);

  return {
    players:
      [
        createCompetitionDefaultPlayer({
          user,
          gameToCompeteIn: {
            stats: gameToCompeteIn?.stats as IGame["stats"],
            shorthand: gameToCompeteIn?.shorthand as IGame["shorthand"]
          }
        })
      ] || [],
    startsAt: startsAt || 0,
    startTime: startTime || 0,
    duration: (parseInt(duration) as ICompetition["duration"]) || 0,
    game: gameName || "no name",
    numberOfPlayers: 1,
    isOver: false,
    name: competitionName || "no name",
    state: "waitingToStart",
    amPm: amPm || "nothing"
  };
};

export const hourToAmPm = (date: Date) => {
  return date.getHours() > 12
    ? (date.getHours() - 12).toString() + ":00 PM"
    : date.getHours().toString() + ":00 AM";
};

export const getDateAndNameOfDay = (date: Date) => {
  const resultDate =
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear();

  // return date.toLocaleString("en-GB", { day: "numeric", month: "numeric" }).toLowerCase();
  return resultDate;
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = error => reject(error);
  });
};

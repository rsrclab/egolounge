import { IGame, ISocialMediaAccount, ICompetition } from ".";

export interface IUserInput {
  email: string;
  username: string; // FIXME: use displayName from the user object in auth if applicable (reserach)
  password: string;
  confirmPassword: string;
  agreedToToS: boolean;
}

export interface IUserDb {
  agreedToCookies: boolean;
  image: string | null;
  email: string;
  emailVerified: boolean;
  primaryGame?: string;
  competitions: {
    competitionsCount: number;
    won: number;
    top3: number; // how many times a user was in top 3 for a competition
    bestScore: number;
    lastTenRanks: number[]; // last 10 games each score for a plot
    all?: {
      id: string;
      date: Date;
      duration: 1 | 2 | 3;
      playersCount: number;
      players: {
        id: string;
        playerImgSrc: string;
      }[];
      game: string;
      stats: any;
      name: string;
    }[];
  };
}

export type LoLGameAccount = {
  accountId: string;
  puuid: string;
  id: string;
  name: string;
  region: string;
  continent: string;
};

export interface IUser extends IUserInput {
  agreedToCookies: boolean;
  reauthenticated: boolean;
  id?: string;
  image?: string | null;
  selectedGame?: IGame | null;
  primaryGame?: string | null;
  emailVerified: boolean;
  // i have commented this out, for now
  // primaryGame?: IGame | null;
  authenticated?: "unauthenticated" | "loading" | "authenticated";
  socialMediaAccounts?: ISocialMediaAccount[];
  gameAccounts: {
    leagueOfLegends: any;
    // apex: any;
    halo: any;
    csgo: any;
    pubg: any;
    dota: any;
    codWarzone: any;
    fortnite: any;
    valorant: any;
  }; // FIXME: Implement, this is for which game is linked and the info that we need for that game to get user data
  competitions?: {
    participatedIn?: number;
    won?: number;
    top3?: number; // how many times a user was in top 3 for a competition
    bestScore?: number;
    lastTenRanks?: number[]; // last 10 games each score for a plot
    all?: Pick<ICompetition, "id">[];
    completed?: {
      id: string;
    };
    waitingToStart?: string[];
    ongoing?: string[];
  };
}

/**
 * Logged in with Social -> Ask for a custom username
 *
 */

/**
 * ingame details for a user
 * username
 * player stats of a given game
 */

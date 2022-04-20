import { IUser } from "~/types";
import { socialMediaAccounts } from "./socialMediaPlatforms";

export const defaultUser: IUser = {
  username: "",
  email: "",
  emailVerified: false,
  password: "",
  confirmPassword: "",
  image: null,
  authenticated: "loading",
  agreedToToS: false,
  selectedGame: null,
  agreedToCookies: false,
  reauthenticated: false,
  socialMediaAccounts: socialMediaAccounts,
  gameAccounts: {
    // apex: null,
    halo: null,
    valorant: null,
    dota: null,
    csgo: null,
    codWarzone: null,
    pubg: null,
    fortnite: null,
    leagueOfLegends: {
      accountId: "",
      continent: "",
      id: "",
      name: "",
      puuid: "",
      region: ""
    }
  }
};

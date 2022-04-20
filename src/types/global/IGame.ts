import { ImageProps } from "next/image";

type Stat = {
  name: string;
  value: number;
};

interface GameStats {
  primaryStatScore: Stat;
  secondaryStatScore: Stat;
  tertiaryStatScore: Stat;
  quaternaryStatScore: Stat;
  score: number;
  rank: number;
}

interface CSStats extends GameStats {}

// type ApexStats = {};

type HaloStats = {};

type FortniteStats = {};

export interface LoLStats extends GameStats {
  primaryStatScore: {
    name: "Kills";
    value: number;
  };
  secondaryStatScore: {
    name: "Assists";
    value: number;
  };
  tertiaryStatScore: {
    name: "Gold Earned";
    value: number;
  };
  quaternaryStatScore: {
    name: "Total Minions Killed";
    value: number;
  };
  score: number;
  rank: number;
}

type PUBGStats = {};

type DotaStats = {
  kills: Stat;
  damage: Stat;
  headshots: Stat;
  accuracy: Stat;
};

type ValorantStats = {};

type CoDStats = {};

export interface IGame {
  minPlayers: number;
  maxPlayers: number;
  internalUrl:
    | "/cs-go"
    // | "/apex"
    | "/halo"
    | "/fortnite"
    | "/league-of-legends"
    | "/pubg"
    | "/dota"
    | "/valorant"
    | "/call-of-duty-warzone";
  name:
    | "CS:GO"
    // | "Apex Legends"
    | "Halo Infinite"
    | "Fortnite"
    | "League of Legends"
    | "PUBG"
    | "DOTA"
    | "Valorant"
    | "Call of Duty: Warzone";
  shorthand:
    | "csgo"
    // | "apexLegends"
    | "halo"
    | "fortnite"
    | "leagueOfLegends"
    | "pubg"
    | "dota"
    | "valorant"
    | "codWarzone";
  formula?: string;
  linked: boolean;
  implemented: boolean;
  stats:
    | CSStats
    | ValorantStats
    // | ApexStats
    | HaloStats
    | DotaStats
    | LoLStats
    | CoDStats
    | FortniteStats
    | PUBGStats;
  bigLogoImg?: ImageProps;
  smallLogoImg?: ImageProps;
}

/**
 * Player can join multiple competitions
 * Create competition popup should have the games selectable in it
 * Game cards hover effect
 * Warning to link a game if trying to join a game competition that is not available
 * My competitions in account drop down
 * My competitions page with a table of all of the competitions that user created and joined
 * Primary game option on the profile
 * Individual Sats (per game, like top kills etc)
 * User is requried to set a username regardless of how they logged in
 *
 */

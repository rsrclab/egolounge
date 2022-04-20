import { IGame } from "~/types";

//FIXME: Add type
const gamesArray: IGame[] = [
  // {
  //   minPlayers: 1,
  //   maxPlayers: 5,
  //   internalUrl: "/apex",
  //   name: "Apex Legends",
  //   shorthand: "apexLegends",
  //   linked: false,
  //   bigLogoImg: {
  //     src: "/static/img/bigGames/apex.png",
  //     width: 640,
  //     height: 370,
  //     alt: "Apex Legends"
  //   },
  //   smallLogoImg: {
  //     src: "/static/img/smallGames/smallApex.png",
  //     width: 50,
  //     height: 34,
  //     alt: "Apex Legends"
  //   },

  //   stats: {
  //     primaryStatScore: {
  //       name: "Kills",
  //       value: 0
  //     },
  //     secondaryStatScore: {
  //       name: "Damage",
  //       value: 0
  //     },
  //     tertiaryStatScore: {
  //       name: "Revives",
  //       value: 0
  //     },
  //     quaternaryStatScore: {
  //       name: "Sniper Kills",
  //       value: 0
  //     }
  //   },
  //   implemented: true
  // },
  {
    minPlayers: 1,
    maxPlayers: 5,
    internalUrl: "/halo",
    name: "Halo Infinite",
    shorthand: "halo",
    linked: false,
    bigLogoImg: {
      src: "/static/img/bigGames/halo.png",
      width: 640,
      height: 370,
      alt: "Halo Infinite"
    },
    smallLogoImg: {
      src: "/static/img/smallGames/smallHalo.png",
      width: 50,
      height: 50,
      alt: "Halo Infinite"
    },

    stats: {
      primaryStatScore: {
        name: "Medals",
        value: 0
      },
      secondaryStatScore: {
        name: "Kills",
        value: 0
      },
      tertiaryStatScore: {
        name: "Assists",
        value: 0
      },
      quaternaryStatScore: {
        name: "Shots Landed",
        value: 0
      }
    },
    implemented: true
  },
  {
    minPlayers: 1,
    maxPlayers: 5,
    internalUrl: "/cs-go",
    name: "CS:GO",
    shorthand: "csgo",
    linked: false,
    bigLogoImg: {
      src: "/static/img/bigGames/csgo.png",
      width: 640,
      height: 370,
      alt: "CS:GO"
    },
    smallLogoImg: {
      src: "/static/img/smallGames/smallCSGO.png",
      width: 74,
      height: 34,
      alt: "CS:GO"
    },

    stats: {
      primaryStatScore: {
        name: "Kills",
        value: 0
      },
      secondaryStatScore: {
        name: "Damage",
        value: 0
      },
      tertiaryStatScore: {
        name: "Headshots",
        value: 0
      },
      quaternaryStatScore: {
        name: "Money Earned",
        value: 0
      }
    },
    implemented: true
  },
  {
    minPlayers: 1,
    maxPlayers: 5,
    internalUrl: "/fortnite",
    name: "Fortnite",
    shorthand: "fortnite",
    linked: false,
    bigLogoImg: {
      src: "/static/img/bigGames/fortnite.png",
      width: 640,
      height: 370,
      alt: "Fortnite"
    },
    smallLogoImg: {
      src: "/static/img/smallGames/smallFortnite.png",
      width: 51,
      height: 34,
      alt: "Fortnite"
    },
    stats: {
      primaryStatScore: {
        name: "Kills",
        value: 0
      },
      secondaryStatScore: {
        name: "Players Outlived",
        value: 0
      },
      tertiaryStatScore: {
        name: "Top 3",
        value: 0
      },
      quaternaryStatScore: {
        name: "Wins",
        value: 0
      }
    },
    implemented: true
  },
  {
    minPlayers: 1,
    maxPlayers: 5,
    internalUrl: "/league-of-legends",
    name: "League of Legends",
    shorthand: "leagueOfLegends",
    linked: false,
    bigLogoImg: {
      src: "/static/img/bigGames/lol.png",
      width: 640,
      height: 370,
      alt: "League of Legends"
    },
    smallLogoImg: {
      src: "/static/img/smallGames/smallLOL.png",
      width: 72,
      height: 34,
      alt: "League of Legends"
    },
    stats: {
      primaryStatScore: {
        name: "Kills",
        value: 0
      },
      secondaryStatScore: {
        name: "Assists",
        value: 0
      },
      tertiaryStatScore: {
        name: "Gold Earned",
        value: 0
      },
      quaternaryStatScore: {
        name: "Minions Killed",
        value: 0
      }
    },
    implemented: true
  },
  // {
  //   minPlayers: 1,
  //   maxPlayers: 5,
  //   internalUrl: "/pubg",
  //   name: "PUBG",
  //   shorthand: "pubg",
  //   linked: false,
  //   bigLogoImg: {
  //     src: "/static/img/bigGames/pubg.png",
  //     width: 640,
  //     height: 370,
  //     alt: "PUBG"
  //   },
  //   smallLogoImg: {
  //     src: "/static/img/smallGames/smallPUBG.png",
  //     width: 80,
  //     height: 25,
  //     alt: "PUBG"
  //   },
  //   stats: {
  //     primaryStatScore: {
  //       name: "Kills",
  //       value: 0
  //     },
  //     secondaryStatScore: {
  //       name: "Damage",
  //       value: 0
  //     },
  //     tertiaryStatScore: {
  //       name: "Boosts",
  //       value: 0
  //     },
  //     quaternaryStatScore: {
  //       name: "Heals",
  //       value: 0
  //     }
  //   },
  //   implemented: true
  // },
  {
    minPlayers: 1,
    maxPlayers: 5,
    internalUrl: "/dota",
    name: "DOTA",
    shorthand: "dota",
    linked: false,
    bigLogoImg: {
      src: "/static/img/bigGames/dota.png",
      width: 640,
      height: 370,
      alt: "DOTA"
    },
    smallLogoImg: {
      src: "/static/img/smallGames/smallDota.png",
      width: 42,
      height: 42,
      alt: "DOTA"
    },

    stats: {
      primaryStatScore: {
        name: "Kills",
        value: 0
      },
      secondaryStatScore: {
        name: "Last Hits",
        value: 0
      },
      tertiaryStatScore: {
        name: "Denied Hits",
        value: 0
      },
      quaternaryStatScore: {
        name: "Networth",
        value: 0
      }
    },
    implemented: true
  },
  {
    minPlayers: 1,
    maxPlayers: 5,
    internalUrl: "/valorant",
    name: "Valorant",
    shorthand: "valorant",
    linked: false,
    bigLogoImg: {
      src: "/static/img/bigGames/valorant.png",
      width: 640,
      height: 370,
      alt: "Valorant"
    },
    smallLogoImg: {
      src: "/static/img/smallGames/smallValorant.png",
      width: 50,
      height: 43,
      alt: "Valorant"
    },
    stats: {
      primaryStatScore: {
        name: "Kills",
        value: 0
      },
      secondaryStatScore: {
        name: "Assists",
        value: 0
      },
      tertiaryStatScore: {
        name: "Grenade Casts",
        value: 0
      },
      quaternaryStatScore: {
        name: "Ultimate Casts",
        value: 0
      }
    },
    implemented: true
  }
  // {
  //   minPlayers: 1,
  //   maxPlayers: 5,
  //   internalUrl: "/call-of-duty-warzone",
  //   name: "Call of Duty: Warzone",
  //   shorthand: "codWarzone",
  //   linked: false,
  //   bigLogoImg: {
  //     src: "/static/img/bigGames/warzone.png",
  //     width: 640,
  //     height: 370,
  //     alt: "Call of Duty Warzone"
  //   },
  //   smallLogoImg: {
  //     src: "/static/img/smallGames/smallWarzone.png",
  //     width: 64,
  //     height: 34,
  //     alt: "Call of Duty Warzone"
  //   },

  //   stats: {
  //     primaryStatScore: {
  //       name: "Kills",
  //       value: 0
  //     },
  //     secondaryStatScore: {
  //       name: "Damage",
  //       value: 0
  //     },
  //     tertiaryStatScore: {
  //       name: "Revives",
  //       value: 0
  //     },
  //     quaternaryStatScore: {
  //       name: "Sniper Kills",
  //       value: 0
  //     }
  //   },
  //   implemented: true
  // }
];

export const games = gamesArray.sort((a, b) =>
  a.name.toLowerCase().localeCompare(b.name.toLowerCase())
);

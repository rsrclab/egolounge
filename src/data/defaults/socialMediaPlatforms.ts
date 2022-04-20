import { ISocialMediaAccount } from "~/types";
// import {
//   DiscordLogo,
//   FacebookLogo,
//   MicrosoftLogo,
//   SteamLogo,
//   // TwitchLogo,
//   TwitterLogo
// } from "../../assets";

const platforms: Pick<ISocialMediaAccount, "platform" | "Logo">[] = [
  // { platform: "Microsoft", Logo: MicrosoftLogo },
  // // { platform: "Twitch", Logo: TwitchLogo },
  // { platform: "Discord", Logo: DiscordLogo },
  // { platform: "Steam", Logo: SteamLogo },
  // { platform: "Facebook", Logo: FacebookLogo },
  // { platform: "Twitter", Logo: TwitterLogo }
];

export const socialMediaAccounts: ISocialMediaAccount[] = platforms.map(({ platform, Logo }) => ({
  platform,
  Logo,
  linked: false,
  userSocial: { name: null, email: null, image: null }
}));

import React from "react";
import { UserAccountCard } from "~/collections";
import * as S from "./elements";
// import { socialMediaAccounts } from "~/data";
import { ISocialMediaAccount } from "~/types";
import {
  DiscordLogo,
  FacebookLogo,
  MicrosoftLogo,
  SteamLogo,
  // TwitchLogo,
  TwitterLogo
} from "~/assets";

const platforms: Pick<ISocialMediaAccount, "platform" | "Logo">[] = [
  { platform: "Microsoft", Logo: MicrosoftLogo },
  // { platform: "Twitch", Logo: TwitchLogo },
  { platform: "Discord", Logo: DiscordLogo },
  { platform: "Steam", Logo: SteamLogo },
  { platform: "Facebook", Logo: FacebookLogo },
  { platform: "Twitter", Logo: TwitterLogo }
];

const socialMediaAccounts: ISocialMediaAccount[] = platforms.map(({ platform, Logo }) => ({
  platform,
  Logo,
  linked: false,
  userSocial: { name: null, email: null, image: null }
}));

const socialData = socialMediaAccounts.map(({ platform, Logo, linked, userSocial }) => ({
  platform,
  Logo,
  linked,
  userSocial
}));

const microsoft = socialData.find(x => x.platform === "Microsoft");
const twitch = socialData.find(x => x.platform === "Twitch");
const discord = socialData.find(x => x.platform === "Discord");
const steam = socialData.find(x => x.platform === "Steam");
const facebook = socialData.find(x => x.platform === "Facebook");
const twitter = socialData.find(x => x.platform === "Twitter");

export const UserSocialsSection: React.FC = ({ ...props }) => {
  //Microsoft
  const handleLinkMicrosoftOnClick = () => {
    console.log("Link Microsoft");
  };
  const handleUnlinkMicrosoftOnClick = () => {
    console.log("Unlink Microsoft");
  };

  //Twitch
  const handleLinkTwitchOnClick = () => {
    console.log("Link Twitch");
  };
  const handleUnlinkTwitchOnClick = () => {
    console.log("Unlink Twitch");
  };

  //Discord
  const handleLinkDiscordOnClick = () => {
    console.log("Link Discord");
  };
  const handleUnlinkDiscordOnClick = () => {
    console.log("Unlink Discord");
  };

  //Steam
  const handleLinkSteamOnClick = () => {
    console.log("Link Steam");
  };
  const handleUnlinkSteamOnClick = () => {
    console.log("Unlink Steam");
  };

  //Facebook
  const handleLinkFacebookOnClick = () => {
    console.log("Link Facebook");
  };
  const handleUnlinkFacebookOnClick = () => {
    console.log("Unlink Facebook");
  };

  //Twitter
  const handleLinkTwitterOnClick = () => {
    console.log("Link Twitter");
  };
  const handleUnlinkTwitterOnClick = () => {
    console.log("Unlink Twitter");
  };

  return (
    <S.Section {...props}>
      <S.Title>Social Accounts</S.Title>

      <S.Card>
        <UserAccountCard
          userId={microsoft?.linked ? "Connected" : "Not Connected"}
          implemented={false}
          name={microsoft?.platform}
          Logo={microsoft?.Logo}
          isLinked={microsoft?.linked}
          linkOnClick={handleLinkMicrosoftOnClick}
          unlinkOnClick={handleUnlinkMicrosoftOnClick}
        />
      </S.Card>
      {/* <S.Card>
        <UserAccountCard
          userId={twitch?.linked ? "Connected" : "Not Connected"}
          implemented={false}
          name={twitch?.platform}
          Logo={twitch?.Logo}
          isLinked={twitch?.linked}
          linkOnClick={handleLinkTwitchOnClick}
          unlinkOnClick={handleUnlinkTwitchOnClick}
        />
      </S.Card> */}
      <S.Card>
        <UserAccountCard
          userId={discord?.linked ? "Connected" : "Not Connected"}
          implemented={false}
          name={discord?.platform}
          Logo={discord?.Logo}
          isLinked={discord?.linked}
          linkOnClick={handleLinkDiscordOnClick}
          unlinkOnClick={handleUnlinkDiscordOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={steam?.linked ? "Connected" : "Not Connected"}
          implemented={false}
          name={steam?.platform}
          Logo={steam?.Logo}
          isLinked={steam?.linked}
          linkOnClick={handleLinkSteamOnClick}
          unlinkOnClick={handleUnlinkSteamOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={facebook?.linked ? "Connected" : "Not Connected"}
          implemented={false}
          name={facebook?.platform}
          Logo={facebook?.Logo}
          isLinked={facebook?.linked}
          linkOnClick={handleLinkFacebookOnClick}
          unlinkOnClick={handleUnlinkFacebookOnClick}
        />
      </S.Card>
      <S.Card>
        <UserAccountCard
          userId={twitter?.linked ? "Connected" : "Not Connected"}
          implemented={false}
          name={twitter?.platform}
          Logo={twitter?.Logo}
          isLinked={twitter?.linked}
          linkOnClick={handleLinkTwitterOnClick}
          unlinkOnClick={handleUnlinkTwitterOnClick}
        />
      </S.Card>
    </S.Section>
  );
};

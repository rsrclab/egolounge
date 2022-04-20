import { NextPage } from "next";
import {
  Hero,
  Games,
  CompetitionCTA,
  DiscordCTA,
  HowItWorks,
  UserCompetitionsSection
} from "~/sections";

const AccountHistory: NextPage = () => {
  return (
    <main>
      <Hero heroImgPath='/static/img/banners/bannerCompetitions.png' />
      <Games />
      <CompetitionCTA />
      <UserCompetitionsSection />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default AccountHistory;

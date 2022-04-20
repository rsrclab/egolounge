import type { NextPage } from "next";
import { CompetitionCTA, DiscordCTA, Games, PolicySection, Hero, HowItWorks } from "~/sections";

const PrivacyPolicy: NextPage = () => {
  return (
    <main>
      <Hero text='PRIVACY' heroImgPath='/static/img/banners/bannerPrivacy.png' />
      <Games />
      <CompetitionCTA />
      <PolicySection policyName='privacyPolicy' />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default PrivacyPolicy;

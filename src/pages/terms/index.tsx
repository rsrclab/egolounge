import type { NextPage } from "next";
import { CompetitionCTA, DiscordCTA, Games, PolicySection, Hero, HowItWorks } from "~/sections";

const TermsOfUse: NextPage = () => {
  return (
    <main>
      <Hero text='TERMS' heroImgPath='/static/img/banners/bannerTerms.png' />
      <Games />
      <CompetitionCTA />
      <PolicySection policyName='termsOfUse' />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default TermsOfUse;

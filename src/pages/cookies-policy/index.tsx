import type { NextPage } from "next";
import { CompetitionCTA, DiscordCTA, Games, PolicySection, Hero, HowItWorks } from "~/sections";

const CookiesPolicy: NextPage = () => {
  return (
    <main>
      <Hero text='COOKIES' heroImgPath='/static/img/banners/bannerCookies.png' />
      <Games />
      <CompetitionCTA />
      <PolicySection policyName='cookiesPolicy' />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default CookiesPolicy;

import { NextPage } from "next";
import { Hero, Games, CompetitionCTA, DiscordCTA, HowItWorks } from "~/sections";

const Home: NextPage = () => {
  return (
    <main>
      <Hero heroImgPath='/static/img/banners/bannerCompete.png' />
      <Games />
      <CompetitionCTA />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default Home;

import { NextPage } from "next";
import { Hero, Games, CompetitionCTA, DiscordCTA, HowItWorks, NotFoundSection } from "~/sections";

const Home: NextPage = () => {
  return (
    <main>
      <Hero />
      <Games />
      <CompetitionCTA />
      <NotFoundSection />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default Home;

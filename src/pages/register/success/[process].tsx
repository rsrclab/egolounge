import type { NextPage } from "next";
import {
  Hero,
  Games,
  CompetitionCTA,
  EmailVerifiedSection,
  HowItWorks,
  DiscordCTA
} from "~/sections";

const RegisterSuccess: NextPage = () => {
  return (
    <main>
      <Hero text='SUCCESS' />
      <Games />
      <CompetitionCTA />
      <EmailVerifiedSection />
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export default RegisterSuccess;

import * as S from "./elements";
import { RegistrationForm } from "~/collections";

const cards = [
  {
    title: "Compete",
    description: "Join Competitions or create your own. Invite friends to compete when it begins."
  },
  {
    title: "Efficiency",
    description:
      "EGO Lounge only calculates scores during competitions; No need to play 16 hours a day!"
  },
  {
    title: "No matchmaking",
    description: "No matchmaking required. Just play and we track who is doing the best."
  },
  {
    title: "Discord",
    description: "Chill @ our Discord, whether you’re social or competitive."
  }
];

export const RegisterSection = ({ ...props }) => {
  return (
    <S.SectionContainer {...props}>
      <S.Container>
        <RegistrationForm />
      </S.Container>

      <S.HowItWorks>
        <S.Title>How it Works</S.Title>
        {cards.map(({ title, description }, i) => (
          <S.Card key={title}>
            <S.CardTitle>
              <span>{i + 1} - </span> {title}
            </S.CardTitle>

            <S.CardDescription>{description}</S.CardDescription>
          </S.Card>
        ))}
      </S.HowItWorks>
    </S.SectionContainer>
  );
};

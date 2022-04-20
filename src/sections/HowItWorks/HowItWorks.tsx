import md5 from "md5";
import { Image } from "~/components";
import * as S from "./elements";

const cards = [
  {
    icon: { width: 40, height: 40, src: "/static/svg/howitworks/trophy1.svg", alt: "trophy svg" },
    title: "1 - Compete",
    description: "Join Competitions or create your own. Invite friends to compete when it begins."
  },
  {
    icon: {
      width: 40,
      height: 40,
      src: "/static/svg/howitworks/efficiency.svg",
      alt: "money svg"
    },
    title: "2 - Efficiency",
    description:
      "EGO Lounge only calculates scores during competitions; No need to play 16 hours a day!"
  },
  {
    icon: {
      width: 40,
      height: 40,
      src: "/static/svg/howitworks/gamecontroller1.svg",
      alt: "game controller svg"
    },
    title: "3 - No matchmaking",
    description: "No matchmaking required. Just play and we track who is doing the best."
  },
  {
    icon: { width: 40, height: 40, src: "/static/svg/howitworks/discord.svg", alt: "discord svg" },
    title: "4 - Discord",
    description: "Chill @ our Discord, whether you’re social or competitive."
  }
];

export const HowItWorks: React.FC = ({ ...props }) => {
  return (
    <S.SectionContainer {...props}>
      <S.Title>How it works</S.Title>
      <S.CardsContainer>
        {cards.map(({ icon, title, description }, i) => (
          <S.CardContainer key={md5(`card${title}${i}`)}>
            <S.CardIcon>
              <Image {...icon} alt={icon.alt} />
            </S.CardIcon>
            <S.CardContent>
              <S.CardTitle>{title}</S.CardTitle>
              <S.CardDescription>{description}</S.CardDescription>
            </S.CardContent>
          </S.CardContainer>
        ))}
      </S.CardsContainer>
    </S.SectionContainer>
  );
};

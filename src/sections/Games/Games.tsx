import md5 from "md5";
import { useContext } from "react";
import { UserContext } from "~/context";
import { GamesCarousel, GameCard } from "~/collections";
import * as S from "./elements";
import { useScreenSize } from "~/hooks";
import { tabletBreakpoint } from "~/styles";
import { games } from "~/data";

const gamesCovers = games.map(({ bigLogoImg, name }) => ({ coverImage: bigLogoImg, name }));

const renderMobile = screenWidth => screenWidth <= tabletBreakpoint;

export const Games: React.FC = ({ ...props }) => {
  const { screenWidth } = useScreenSize();
  // const { selectedGame } = useContext(UserContext);
  const selectedGame = "Fortnite";

  return !renderMobile(screenWidth) ? (
    <S.SectionContainer {...props}>
      <S.GamesContainer>
        {gamesCovers.map(({ name, coverImage }, i) => (
          <GameCard
            key={md5(`gamecardimg${i}`)}
            active={selectedGame === name}
            imgProps={coverImage}
          />
        ))}
      </S.GamesContainer>
    </S.SectionContainer>
  ) : (
    <GamesCarousel {...props} selectedGame={selectedGame} />
  );
};

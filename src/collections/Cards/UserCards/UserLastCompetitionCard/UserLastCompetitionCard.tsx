import * as S from "./elements";
import { Image } from "~/components";
import { games } from "~/data";
import { ImageProps } from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "~/context";

const maxVisiblePlayers = 4;

export const UserLastCompetitionCard = ({
  id,
  players,
  game: gameName,
  duration,
  date,
  name: competitionName,
  playersCount,
  rank,
  ...props
}) => {
  const { user } = useContext(UserContext);
  const competitionGame = games.find(({ name }) => name === gameName);

  const playedAtDate = new Date(date);
  const restOfPlayers =
    players?.length > 0 && players.filter(({ id }) => id !== user.id).slice(0, maxVisiblePlayers);

  return (
    <S.Container {...props}>
      <S.Content>
        <S.InnerContainer>
          <S.Head>
            <S.Title>Last Competition</S.Title>
            <S.Name>{competitionName}</S.Name>
            <S.Date>{`${
              playedAtDate.getMonth() + 1
            }/${playedAtDate.getDate()}/${playedAtDate.getFullYear()} - ${duration} ${
              duration > 1 ? "Hours" : "Hour"
            }`}</S.Date>
          </S.Head>

          <S.Summary>
            <S.Players>
              {restOfPlayers &&
                restOfPlayers.map(({ id: playerId, playerImgSrc }, i) => (
                  <S.PlayerContainer key={`${playerId}-${i}`}>
                    {i < maxVisiblePlayers && (
                      <Link href={`/competitor/${playerId}/stats`}>
                        <a>
                          <S.PlayerImage src={playerImgSrc} />
                        </a>
                      </Link>
                    )}
                  </S.PlayerContainer>
                ))}
              {players.length > maxVisiblePlayers && (
                <S.OtherUsers>
                  <S.PlayerCount>+{players.length - maxVisiblePlayers - 1}</S.PlayerCount>
                </S.OtherUsers>
              )}
            </S.Players>
          </S.Summary>
        </S.InnerContainer>

        <S.Actions>
          <S.Game>
            <Image {...(competitionGame?.smallLogoImg as ImageProps)} alt={`competition-${id}`} />
          </S.Game>
          <S.Button href={`/competition/${id}`} value='DETAILS' />
        </S.Actions>
      </S.Content>
    </S.Container>
  );
};

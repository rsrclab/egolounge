import React, { useEffect } from "react";
import { Image } from "~/components";
import * as S from "./elements";
import Link from "next/link";
import { games } from "~/data";
import { IGame } from "~/types";

const maxVisiblePlayers = 4;

export interface UserCompetitionProps {
  id: string;
  duration: 1 | 2 | 3;
  startsAt: string;
  name: string;
  players: { id: string; playerImgSrc: string }[];
  gameName: IGame["name"];
}

export const UserCompetitionCard: React.FC<UserCompetitionProps> = ({
  duration,
  gameName,
  name,
  players,
  startsAt,
  id,
  ...props
}) => {
  const gameImageProps = games.find(defaultGame => defaultGame.name === gameName)?.smallLogoImg;
  const playedAtDate = new Date(startsAt);

  return (
    <S.Container {...props}>
      <S.Head>
        <S.TitleContainer>
          <S.Name>{name}</S.Name>

          <S.Date>
            {`${
              playedAtDate.getMonth() + 1
            }/${playedAtDate.getDate()}/${playedAtDate.getFullYear()} - ${duration} Hours`}
          </S.Date>
        </S.TitleContainer>

        <S.GameImage>{gameImageProps && <Image {...gameImageProps} alt={name} />}</S.GameImage>
      </S.Head>

      <S.Players>
        {players.slice(0, maxVisiblePlayers).map(({ id, playerImgSrc }, i) => (
          <S.PlayerContainer key={id + i}>
            {i < maxVisiblePlayers && playerImgSrc && (
              <Link href={`/competitor/${id}/stats`}>
                <a>
                  <S.PlayerImage src={playerImgSrc} alt={id || "no id"} />
                </a>
              </Link>
            )}
          </S.PlayerContainer>
        ))}
        {players.length > maxVisiblePlayers && (
          <S.OtherUsers>
            <S.PlayerCount>+{players.length - maxVisiblePlayers}</S.PlayerCount>
          </S.OtherUsers>
        )}
      </S.Players>

      <Link href={`/competition/${id}`}>
        <a>
          <S.GameButton value='DETAILS' />
        </a>
      </Link>
    </S.Container>
  );
};

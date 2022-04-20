import * as S from "./elements";
import { Image } from "~/components";
import Link from "next/link";

export const PlayerCompetitionStatsCard = ({
  statName,
  value,
  userDbId,
  image,
  username,
  ...props
}) => {
  return (
    <S.Container {...props}>
      <S.StatName>{statName}</S.StatName>

      <S.Summary>
        <S.Player>
          <S.PlayerImageContainer>
            <Image src={image} alt={username + " avatar"} width={46} height={46} />
          </S.PlayerImageContainer>
          <S.PlayerStats>
            <S.Text>
              {username}: {value.toFixed(0)}
            </S.Text>
          </S.PlayerStats>
        </S.Player>
        <Link href={`/competitor/${userDbId}/stats`}>
          <a>
            <S.Button value='PROFILE' />
          </a>
        </Link>
      </S.Summary>
    </S.Container>
  );
};

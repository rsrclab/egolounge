import Link from "next/link";
import * as S from "./elements";

export const MyCompetitionPlayersData = ({
  id,
  username,
  recentAverage,
  monthlyBest,
  primaryGame,
  avatar,
  isOwner,
  isYou,
  competitionId,
  ...props
}) => {
  return (
    <S.PlayerData {...props}>
      <S.CardRow>
        <S.Typography>PLAYER NAME</S.Typography>
        <S.Typography textAlign='right'>{username}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>RECENT AVERAGE</S.Typography>
        <S.Typography textAlign='right'>{recentAverage}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>MONTHLY BEST</S.Typography>
        <S.Typography textAlign='right'>{monthlyBest}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>PRIMARY GAME</S.Typography>
        <S.Typography textAlign='right'>{primaryGame}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>PROFILE</S.Typography>
        <S.ImageContainer>
          <Link href={`/competitor/${id}/stats`}>
            <a>
              <S.Image src={avatar} width={46} height={46} />
            </a>
          </Link>
        </S.ImageContainer>
      </S.CardRow>
      <S.CardRow>
        <S.ActionsContainer>
          {isYou && isOwner ? (
            <></>
          ) : (
            <S.CompetitionKickButton
              value='Kick'
              competitionId={competitionId}
              targetPlayerId={id}
              targetPlayerUsername={username}
            />
          )}
        </S.ActionsContainer>
      </S.CardRow>
    </S.PlayerData>
  );
};

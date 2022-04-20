import Link from "next/link";
import * as S from "./elements";

export const CompetitionCollapsedRow = ({
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
    <S.TableRow {...props}>
      <S.CollapsedTableCell textAlign='left'>{isOwner ? "You" : username}</S.CollapsedTableCell>
      <S.CollapsedTableCell>{recentAverage?.toFixed(2)}</S.CollapsedTableCell>
      <S.CollapsedTableCell>{monthlyBest?.toFixed(2)}</S.CollapsedTableCell>
      <S.CollapsedTableCell>{primaryGame}</S.CollapsedTableCell>
      <S.CollapsedTableCell>
        <Link href={`/competitor/${id}/stats`}>
          <a>
            <S.Image src={avatar} width={46} height={46} />
          </a>
        </Link>
      </S.CollapsedTableCell>
      <S.CollapsedTableCell>
        {isOwner ? (
          isYou ? (
            <></>
          ) : (
            <S.CompetitionKickButton
              value='Kick'
              competitionId={competitionId}
              targetPlayerId={id}
              targetPlayerUsername={username}
            />
          )
        ) : (
          <></>
        )}
      </S.CollapsedTableCell>
    </S.TableRow>
  );
};

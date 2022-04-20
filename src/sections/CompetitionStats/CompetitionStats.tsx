import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SmallTrophyIcon, SmallMedalIcon } from "~/assets";
import { Image, PlayerCompetitionStatsCard } from "~/components";
import * as S from "./elements";
import { UserContext } from "~/context";

const maxVisibleRankPlayers = 10;

const ranks = {
  1: "st",
  2: "nd",
  3: "rd"
};

const getMaxPlayerForStat = (players, statKey) => {
  const maxPlayer =
    players?.length > 0
      ? players.reduce((currentMaxPlayer, nextPlayer) =>
          currentMaxPlayer.stats[statKey].value > nextPlayer.stats[statKey].value
            ? currentMaxPlayer
            : nextPlayer
        )
      : 0;

  return {
    value: maxPlayer.stats[statKey].value,
    name: maxPlayer.stats[statKey].name,
    username: maxPlayer.username,
    userDbId: maxPlayer.id,
    userAvatarImgSrc: maxPlayer.image
  };
};

export const CompetitionStats = ({ competition, competitionState, ...props }) => {
  const { players } = competition;
  const { user } = useContext(UserContext);
  const [timeleft, setTimeleft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!competition?.isOver) {
      const intervalHandler = setInterval(() => {
        const now = new Date().getTime();
        const endsAt =
          new Date(competition.startsAt).valueOf() + 60 * 60 * 1000 * competition.duration;

        const timeleft = new Date(endsAt).getTime() - now;

        const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        setTimeleft(prevTime => ({ ...prevTime, hours, minutes, seconds }));
      }, 1000);

      return () => {
        clearInterval(intervalHandler);
      };
    }

    return () => {};
  }, [competition]);

  if (!competition || !players.length)
    return (
      <div style={{ color: "white", textAlign: "center", padding: "48px 0" }}>
        Competition does not exist
      </div>
    );

  competition.primaryStat = getMaxPlayerForStat(players, "primaryStatScore");
  competition.secondaryStat = getMaxPlayerForStat(players, "secondaryStatScore");
  competition.tertiaryStat = getMaxPlayerForStat(players, "tertiaryStatScore");
  competition.quaternaryStat = getMaxPlayerForStat(players, "quaternaryStatScore");

  const [firstPlacePlayer, secondPlacePlayer, thirdPlacePlayer, ...restOfPlayers] = players;

  const currentPlayerRank = players.findIndex(({ id }) => id === user.id) + 1;

  return (
    <S.SectionContainer {...props}>
      <S.Head>
        {/* <S.Select
          id='statisticsSelect'
          options={statisticsSelection}
          defaultValue={statisticsSelection[0]}
          form={form}
        /> */}
      </S.Head>
      <S.Content>
        <S.Banner>
          <S.BannerTitle playerRank={currentPlayerRank}>
            {players.find(x => x.id === user.id) ? (
              <>
                <span>{competitionState === "finished" ? "Final" : "Current"} Rank: </span>
                <span>
                  {currentPlayerRank < 4
                    ? currentPlayerRank + ranks[currentPlayerRank] + " "
                    : currentPlayerRank + "th "}
                </span>
                out of 50
              </>
            ) : (
              <span>Not Competing</span>
            )}
          </S.BannerTitle>
          {competitionState === "inProgress" && (
            <S.BannerTitle>
              <span>Time remaining</span> 0{timeleft.hours}:{timeleft.minutes < 10 ? "0" : ""}
              {timeleft.minutes}:{timeleft.seconds < 10 ? "0" : ""}
              {timeleft.seconds}
            </S.BannerTitle>
          )}

          {competitionState === "finished" && (
            <S.BannerTitle>
              <span>Competition Ended</span>
            </S.BannerTitle>
          )}
        </S.Banner>
        <S.Overview>
          <S.OverviewCompetitionName>{competition.competitionName}</S.OverviewCompetitionName>
          <S.OverviewTop3Players>
            <S.OverviewTop2>
              {secondPlacePlayer && (
                <>
                  <SmallMedalIcon color='#BCBCBC' />
                  <S.OverviewTopPlace>2</S.OverviewTopPlace>
                  <S.RatingTopUsername playerRank={2}>
                    <Link href={`/competitor/${secondPlacePlayer.id}/stats`}>
                      <a>{secondPlacePlayer.username}</a>
                    </Link>
                  </S.RatingTopUsername>
                </>
              )}
            </S.OverviewTop2>
            <S.OverviewTop1>
              {firstPlacePlayer && (
                <>
                  <SmallTrophyIcon />
                  <S.OverviewTopPlace>1</S.OverviewTopPlace>
                  <S.RatingTopUsername playerRank={1}>
                    <Link href={`/competitor/${firstPlacePlayer.id}/stats`}>
                      <a>{firstPlacePlayer.username}</a>
                    </Link>
                  </S.RatingTopUsername>
                </>
              )}
            </S.OverviewTop1>
            <S.OverviewTop3>
              {thirdPlacePlayer && (
                <>
                  <SmallMedalIcon color='#793E3E' />
                  <S.OverviewTopPlace>3</S.OverviewTopPlace>
                  <S.RatingTopUsername playerRank={3}>
                    <Link href={`/competitor/${thirdPlacePlayer.id}/stats`}>
                      <a>{thirdPlacePlayer.username}</a>
                    </Link>
                  </S.RatingTopUsername>
                </>
              )}
            </S.OverviewTop3>
          </S.OverviewTop3Players>
        </S.Overview>
        <S.ScorecardPlayers>
          <S.ScorecardHead>
            <S.ScorecardRow>
              <S.ScorecardTH>RANK</S.ScorecardTH>
              <S.ScorecardTH>NAME</S.ScorecardTH>
              <S.ScorecardTH>SCORE</S.ScorecardTH>
              <S.ScorecardTH>PROFILE</S.ScorecardTH>
            </S.ScorecardRow>
          </S.ScorecardHead>
          <S.ScorecardPlayersContent>
            {players.slice(0, maxVisibleRankPlayers).map((playerProps, i) => (
              <>
                <S.ScorecardPlayer key={playerProps.name + "-" + i}>
                  <S.ScorecardPlayerRank playerRank={i + 1}>
                    <span>{i + 1}</span>
                  </S.ScorecardPlayerRank>
                  <S.ScorecardPlayerUsername playerRank={i + 1}>
                    <Link href={`/competitor/${playerProps.id}/stats`}>
                      <a>{playerProps.username}</a>
                    </Link>
                  </S.ScorecardPlayerUsername>
                  <S.ScorecardPlayerScore playerRank={i + 1}>
                    {playerProps.stats.score?.toFixed(2)}
                  </S.ScorecardPlayerScore>
                  <S.ScorecardPlayerImage>
                    <Link href={`/competitor/${playerProps.id}/stats`}>
                      <a>
                        <Image
                          src={playerProps.image}
                          width={46}
                          height={46}
                          alt={playerProps.name + " avatar"}
                        />
                      </a>
                    </Link>
                  </S.ScorecardPlayerImage>
                </S.ScorecardPlayer>

                <tr>
                  <td>
                    {playerProps.stats.primaryStatScore.name}:{" "}
                    {playerProps.stats.primaryStatScore.value}
                  </td>
                  <td>
                    {playerProps.stats.secondaryStatScore.name}:{" "}
                    {playerProps.stats.secondaryStatScore.value}
                  </td>
                  <td>
                    {playerProps.stats.tertiaryStatScore.name}:{" "}
                    {playerProps.stats.tertiaryStatScore.value}
                  </td>
                  <td>
                    {playerProps.stats.quaternaryStatScore.name}:{" "}
                    {playerProps.stats.quaternaryStatScore.value}
                  </td>
                </tr>
              </>
            ))}
          </S.ScorecardPlayersContent>
        </S.ScorecardPlayers>
        <S.Stats>
          <S.StatsTitle>Individual Stats Leaders</S.StatsTitle>
          <PlayerCompetitionStatsCard
            username={competition.primaryStat.username}
            statName={competition.primaryStat.name}
            value={competition.primaryStat.value}
            userDbId={competition.primaryStat.userDbId}
            image={competition.primaryStat.userAvatarImgSrc}
          />
          <PlayerCompetitionStatsCard
            username={competition.secondaryStat.username}
            statName={competition.secondaryStat.name}
            value={competition.secondaryStat.value}
            userDbId={competition.secondaryStat.userDbId}
            image={competition.secondaryStat.userAvatarImgSrc}
          />
          <PlayerCompetitionStatsCard
            username={competition.tertiaryStat.username}
            statName={competition.tertiaryStat.name}
            value={competition.tertiaryStat.value}
            userDbId={competition.tertiaryStat.userDbId}
            image={competition.tertiaryStat.userAvatarImgSrc}
          />
          <PlayerCompetitionStatsCard
            username={competition.quaternaryStat.username}
            statName={competition.quaternaryStat.name}
            value={competition.quaternaryStat.value}
            userDbId={competition.quaternaryStat.userDbId}
            image={competition.quaternaryStat.userAvatarImgSrc}
          />
        </S.Stats>
      </S.Content>
    </S.SectionContainer>
  );
};

const Timer = () => {};

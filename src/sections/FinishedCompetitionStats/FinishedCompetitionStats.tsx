import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { SmallTrophyIcon, SmallMedalIcon } from "~/assets";
import { Image, PlayerCompetitionStatsCard } from "~/components";
import { useScreenSize } from "~/hooks";
import { tabletBreakpoint } from "~/styles";
import { games } from "~/data";
import { useForm } from "react-hook-form";
import * as S from "./elements";
import { UserContext } from "~/context";

const maxVisibleRankPlayers = 10;

const ranks = {
  1: "st",
  2: "nd",
  3: "rd"
};

interface StatTopPlayer {
  value: string;
  name: string;
  username: string;
  userDbId: string;
  userAvatarImgSrc: string;
}

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

const getTopPlayersForCompetition = (
  players
): [StatTopPlayer, StatTopPlayer, StatTopPlayer, StatTopPlayer] => {
  return [
    getMaxPlayerForStat(players, "primaryStatScore"),
    getMaxPlayerForStat(players, "secondaryStatScore"),
    getMaxPlayerForStat(players, "tertiaryStatScore"),
    getMaxPlayerForStat(players, "quaternaryStatScore")
  ];
};

export const FinishedCompetitionStats = ({ competition, competitionState, ...props }) => {
  const [firstPlacePlayer, secondPlacePlayer, thirdPlacePlayer, ...restOfPlayers] =
    competition.players?.sort((playerA, playerB) => playerA.stats.score > playerB.stats.score);

  const [
    primaryStatTopPlayer,
    secondaryStatTopPlayer,
    tertiaryStatTopPlayer,
    quaternaryStatTopPlayer
  ] = getTopPlayersForCompetition(competition.players);

  return (
    <S.SectionContainer {...props}>
      <S.Content>
        <S.Banner>
          <S.BannerTitle>
            <span>Competition Ended</span>
          </S.BannerTitle>
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
            <S.ScorecardTH>RANK</S.ScorecardTH>
            <S.ScorecardTH>NAME</S.ScorecardTH>
            <S.ScorecardTH>SCORE</S.ScorecardTH>
            <S.ScorecardTH>PROFILE</S.ScorecardTH>
          </S.ScorecardHead>
          <S.ScorecardPlayersContent>
            {competition.players
              .slice(0, maxVisibleRankPlayers)
              .sort((playerA, playerB) => playerB._score - playerA._score)
              .map((playerProps, i) => (
                <S.ScorecardPlayer key={playerProps.username + "-" + i}>
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
                          width={42}
                          height={42}
                          alt={playerProps.username + " avatar"}
                        />
                      </a>
                    </Link>
                  </S.ScorecardPlayerImage>
                </S.ScorecardPlayer>
              ))}
          </S.ScorecardPlayersContent>
        </S.ScorecardPlayers>
        <S.Stats>
          <S.StatsTitle>Individual Stats Leaders</S.StatsTitle>
          <PlayerCompetitionStatsCard
            username={primaryStatTopPlayer.username}
            statName={primaryStatTopPlayer.name}
            value={primaryStatTopPlayer.value}
            userDbId={primaryStatTopPlayer.userDbId}
            image={primaryStatTopPlayer.userAvatarImgSrc}
          />
          <PlayerCompetitionStatsCard
            username={secondaryStatTopPlayer.username}
            statName={secondaryStatTopPlayer.name}
            value={secondaryStatTopPlayer.value}
            userDbId={secondaryStatTopPlayer.userDbId}
            image={secondaryStatTopPlayer.userAvatarImgSrc}
          />
          <PlayerCompetitionStatsCard
            username={tertiaryStatTopPlayer.username}
            statName={tertiaryStatTopPlayer.name}
            value={tertiaryStatTopPlayer.value}
            userDbId={tertiaryStatTopPlayer.userDbId}
            image={tertiaryStatTopPlayer.userAvatarImgSrc}
          />
          <PlayerCompetitionStatsCard
            username={quaternaryStatTopPlayer.username}
            statName={quaternaryStatTopPlayer.name}
            value={quaternaryStatTopPlayer.value}
            userDbId={quaternaryStatTopPlayer.userDbId}
            image={quaternaryStatTopPlayer.userAvatarImgSrc}
          />
        </S.Stats>
      </S.Content>
    </S.SectionContainer>
  );
};

const Timer = () => {};

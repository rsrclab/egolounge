/* eslint-disable jsx-a11y/alt-text */
import * as S from "./elements";
import { Chart, Image } from "~/components";
import React from "react";
import { JoystickIcon, MedalIcon, TrophyIcon, StarIcon, PhotoIcon } from "~/assets";
import { games } from "~/data";

export const UserStatsSection = ({ user, ...props }) => {
  // FIXME: type...
  const userPrimaryGameImage: any = games.find(
    ({ name }) => name === user.primaryGame
  )?.smallLogoImg;

  return (
    <S.Container {...props}>
      <S.UsernamePanel>
        <S.UsernamePanelLeft>
          <S.UserAvatarContainer>
            {user?.image ? (
              <Image src={user?.image} width={125} height={125} alt={user.username + " avatar"} />
            ) : (
              <PhotoIcon />
            )}
          </S.UserAvatarContainer>
          <S.UsernameContainer>
            <S.Username>{user.username}</S.Username>
            <S.TotalCompetitions>{user.competitions.all.length} Competitions</S.TotalCompetitions>
            <S.MostPlayedGameContainer>
              {userPrimaryGameImage ? <Image {...userPrimaryGameImage} /> : "No Primary Game"}
            </S.MostPlayedGameContainer>
          </S.UsernameContainer>
        </S.UsernamePanelLeft>
        <S.UsernamePanelRight>
          <S.AllCompetitionButton
            value='ALL COMPETITIONS'
            href={`/competitor/${user.id}/archives`}
          />
        </S.UsernamePanelRight>
      </S.UsernamePanel>
      <S.OverrallContainer>
        <S.OverallCardContainer2of4>
          <S.OverrallCard>
            <JoystickIcon />
            <S.OverrallCardNumber>{user.competitions.all.length}</S.OverrallCardNumber>
            <span>Competitions</span>
          </S.OverrallCard>
          <S.OverrallCard>
            <TrophyIcon />
            <S.OverrallCardNumber>{user.competitions.won}</S.OverrallCardNumber>
            <span>Wins</span>
          </S.OverrallCard>
        </S.OverallCardContainer2of4>
        <S.OverallCardContainer2of4>
          <S.OverrallCard>
            <MedalIcon />
            <S.OverrallCardNumber>{user.competitions.top3}</S.OverrallCardNumber>
            <span>Top #3s</span>
          </S.OverrallCard>
          <S.OverrallCard>
            <StarIcon />
            <S.OverrallCardNumber>{user.competitions.bestScore.toFixed(0)}</S.OverrallCardNumber>
            <span>Best Score</span>
          </S.OverrallCard>
        </S.OverallCardContainer2of4>
      </S.OverrallContainer>
      <S.PreviousRankingsGraph>
        <S.PreviousRankingsGraphTitle>Previous Rankings</S.PreviousRankingsGraphTitle>
        <S.PreviousRankingsGraphContainer>
          {/* {user?.competitions?.all?.length > 0 ? ( */}
          <S.RankingSvg place={1}>
            <TrophyIcon />
          </S.RankingSvg>
          <S.RankingSvg place={2}>
            <MedalIcon />
          </S.RankingSvg>
          <S.RankingSvg place={3}>
            <MedalIcon />
          </S.RankingSvg>
          <Chart
            id='previousRankingsGraph'
            data={user?.competitions?.lastTenRanks.map(score => ({ number: score })) || []}
            width='480px'
            height='320px'
          />
          {/* ) : (
             <S.Text>Competitor has not participated in any games yet!</S.Text>
           )} */}
        </S.PreviousRankingsGraphContainer>
      </S.PreviousRankingsGraph>
      <S.LastCompetition>
        {user.competitions.all?.length > 0 ? (
          <S.Card {...user.competitions.all[user.competitions.all.length - 1]} />
        ) : (
          <S.TextContainer>
            <S.Text>Competitor has not participated in any games yet!</S.Text>
          </S.TextContainer>
        )}
      </S.LastCompetition>
    </S.Container>
  );
};

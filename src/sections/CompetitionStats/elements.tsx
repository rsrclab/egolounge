import styled, { css } from "styled-components";
import { Typography, FormSelect as BaseFormSelect } from "~/components";
import { maxMobile, maxComputer, maxSmallMobile, maxTablet, theme } from "~/styles";

export const Select = styled(({ ...props }) => <BaseFormSelect {...props} />)``;

export const SectionContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 1440px;
  margin: 30px auto 100px;
  display: flex;
  flex-direction: column;
  color: ${theme.colors.white};

  @media ${maxTablet} {
    margin: 60px 30px;
  }
`;

export const Head = styled(({ ...props }) => <div {...props} />)`
  margin-bottom: 40px;
  align-self: flex-end;

  @media ${maxTablet} {
    width: 100%;

    select {
      width: 100%;
    }
  }
`;

export const Content = styled(({ ...props }) => <div {...props} />)`
  justify-content: center;
  gap: 20px;
  margin: 0 20px;

  @media ${maxTablet} {
    flex-direction: column;
    padding: 30px 0;
    margin: 0;
    align-items: center;
  }
`;

//Competition Overview
export const Overview = styled(({ ...props }) => <div {...props} />)`
  background-color: ${theme.colors.black1F};
  padding: 30px 65px 25px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;

  float: left;
  width: 40%;

  @media ${maxTablet} {
    margin-top: 20px;
    float: unset;
    width: 100%;
    padding: 30px;
  }
`;

export const OverviewCompetitionName = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={600} />
))`
  margin: 0;
  text-align: center;
`;

export const OverviewTop3Players = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;

  @media ${maxMobile} {
    column-gap: 5px;
  }
`;

export const OverviewTopPlace = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={700} lineHeight='28px' />
))`
  text-align: center;
  padding-top: 10px;
`;

const playerRankColors = {
  1: css`
    color: ${theme.colors.golden};
  `,
  2: css`
    color: ${theme.colors.gray};
  `,
  3: css`
    color: ${theme.colors.brown};
  `
};

export const RatingTopUsername = styled(({ playerRank, ...props }) => <div {...props} />)`
  margin: 0;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ playerRank }) => playerRankColors[playerRank]}
`;

export const OverviewTop1 = styled(({ ...props }) => <div {...props} />)`
  flex-basis: 33.33%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;

  ${OverviewTopPlace} {
    height: 110px;
    width: 52px;
    border-radius: 5px 5px 0px 0px;
    background: linear-gradient(180deg, #dea30a 0%, #584001 100%);
  }
`;

export const OverviewTop2 = styled(({ ...props }) => <div {...props} />)`
  flex-basis: 33.33%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 62px;

  ${OverviewTopPlace} {
    height: 72px;
    width: 52px;
    border-radius: 5px 5px 0px 0px;
    ${theme.gradient.gray};
  }
`;

export const OverviewTop3 = styled(({ ...props }) => <div {...props} />)`
  flex-basis: 33.33%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 88px;

  ${OverviewTopPlace} {
    height: 46px;
    width: 52px;
    border-radius: 5px 5px 0px 0px;
    ${theme.gradient.brown};
  }
`;

//Competition Stats
export const Stats = styled(({ ...props }) => <div {...props} />)`
  border-radius: 10px;
  clear: left;
  float: left;
  padding: 30px 25px 35px;
  width: 40%;
  background-color: ${theme.colors.black1F};
  margin-top: 20px;

  @media ${maxTablet} {
    float: unset;
    width: 100%;
    padding: 25px 10px;
  }
`;

export const StatsTitle = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={600} />
))`
  text-align: center;
  background-color: ${theme.colors.black1F};
  color: ${theme.colors.golden};
  margin: 0;
  margin-bottom: 50px;
  border-radius: 10px;
`;

export const StatsPlayers = styled(({ ...props }) => <div {...props} />)``;

//Competition Banner
export const Banner = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  gap: 20px;
  float: right;
  width: 58%;
  margin-left: 20px;

  @media ${maxComputer} {
    width: 56%;
  }

  @media ${maxTablet} {
    float: unset;
    margin: 0;
    width: 100%;
    flex-direction: column;
  }
`;

export const BannerTitle = styled(({ playerRank, ...props }) => (
  <Typography {...props} variant='h3' weight={400} />
))`
  margin: 0;
  flex-basis: 50%;
  text-align: center;
  border-radius: 5px;
  background-color: ${theme.colors.black1F};
  padding: 20px 5px;

  span:last-child {
    ${({ playerRank }) => playerRankColors[playerRank]}
  }

  span {
    font-weight: 600;
  }

  @media ${maxComputer} {
    font-size: 18px;
  }

  @media ${maxTablet} {
    width: 100%;
  }
`;

//Competition Scorecard
export const ScorecardPlayers = styled(({ ...props }) => <table {...props} />)`
  background-color: ${theme.colors.black1F};
  margin-top: 20px;
  border-radius: 15px;
  border-collapse: separate;
  border-spacing: 20px 30px;

  float: right;
  clear: right;
  width: 58%;
  margin-left: 20px;

  @media ${maxComputer} {
    width: 56%;
  }

  @media ${maxTablet} {
    margin: 0;
    margin-top: 20px;
    float: unset;
    width: 100%;
  }

  @media ${maxSmallMobile} {
    border-spacing: 0 30px;
    padding: 0 10px;
  }
`;

export const ScorecardHead = styled(({ ...props }) => <thead {...props} />)`
  position: relative;
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.golden};
  }
`;

export const ScorecardRow = styled(({ ...props }) => <tr {...props} />)``;

export const ScorecardTH = styled(({ ...props }) => <th {...props} />)`
  text-align: left;
  padding-bottom: 30px;
  font-size: 16px;
  font-weight: 600;

  &:nth-of-type(1) {
    width: 220px;
    padding-left: 20px;

    @media ${maxTablet} {
      padding-left: 0;
    }
  }

  &:nth-of-type(2) {
    width: 270px;
  }

  &:nth-of-type(3) {
    width: 175px;
  }

  &:nth-of-type(4) {
    width: 120px;
  }

  &:last-child {
    text-align: center;
  }
`;

export const ScorecardPlayersContent = styled(({ ...props }) => <tbody {...props} />)``;

export const ScorecardPlayer = styled(({ ...props }) => <tr {...props} />)`
  & + & {
    margin-top: 30px;
  }
`;

export const ScorecardPlayerRank = styled(({ playerRank, ...props }) => <td {...props} />)`
  ${({ playerRank }) => playerRankColors[playerRank]};
  width: 100px !important;

  span {
    margin-left: 20px;

    @media ${maxTablet} {
      margin-left: 0;
    }
  }
`;

export const ScorecardPlayerUsername = styled(({ playerRank, ...props }) => <td {...props} />)`
  ${({ playerRank }) => playerRankColors[playerRank]};
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ScorecardPlayerScore = styled(({ playerRank, ...props }) => <td {...props} />)`
  padding-left: 20px;
  ${({ playerRank }) => playerRankColors[playerRank]};
`;

export const ScorecardPlayerImage = styled(({ ...props }) => <td {...props} />)`
  border-radius: 5px;
  filter: drop-shadow(-4px -4px 12px rgba(49, 49, 49, 0.5)) drop-shadow(4px 4px 12px #000000);
  text-align: center;
`;

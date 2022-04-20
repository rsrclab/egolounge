import styled, { css } from "styled-components";
import { Button, Typography } from "~/components";
import { UserLastCompetitionCard } from "~/collections";
import { maxComputer, maxMobile, maxSmallMobile, maxTablet, theme } from "~/styles";

export const Container = styled(({ ...props }) => <div {...props} />)`
  max-width: 1440px;
  margin: 100px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 570px));
  grid-template-areas:
    "UsernamePanel PreviousRankingsGraph"
    "Overall PreviousRankingsGraph"
    "Overall LastCompetition";
  grid-row-gap: 30px;
  grid-column-gap: 60px;
  justify-content: center;
  color: ${theme.colors.white};

  & > div {
    border-radius: 15px;
  }

  @media ${maxComputer} {
    grid-column-gap: 30px;
  }

  @media ${maxTablet} {
    grid-template-areas:
      "UsernamePanel"
      "PreviousRankingsGraph"
      "LastCompetition"
      "Overall";
    grid-row-gap: 40px;
    grid-column-gap: 0;
  }

  @media ${maxSmallMobile} {
  }
`;

//grid-area UsernamePanel
export const UsernamePanel = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  grid-area: UsernamePanel;
  background-color: ${theme.colors.black1F};
  display: flex;
  justify-content: space-between;
  padding: 17px;

  @media ${maxTablet} {
    flex-direction: column;
    row-gap: 30px;
  }
`;

export const UsernamePanelLeft = styled(({ ...props }) => <div {...props} />)`
  display: flex;

  @media ${maxTablet} {
    width: 100%;
  }
`;

export const UsernamePanelRight = styled(({ ...props }) => <div {...props} />)`
  align-self: flex-end;
  position: absolute;
  bottom: 17px;
  right: 17px;

  @media ${maxTablet} {
    position: relative;
    bottom: unset;
    right: unset;
    width: 100%;
  }
`;

export const UserAvatarContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 125px;
  max-height: 125px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    border-radius: 5px;
  }
`;

export const UsernameContainer = styled(({ ...props }) => <div {...props} />)`
  width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Username = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={600} />
))`
  margin: 0;

  @media ${maxComputer} {
  }
`;

export const AllCompetitionButton = styled(({ ...props }) => (
  <Button {...props} variant='contained' typography={{ variant: "h5", weight: 700 }} />
))`
  height: 44px;
  min-height: 44px;
  width: 203px;

  @media ${maxComputer} {
    width: 120px;
    h5 {
      font-size: 12px;
    }
  }

  @media ${maxTablet} {
    width: 100%;
  }
`;

export const TotalCompetitions = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} />
))`
  margin: 0;
  margin-bottom: 14px;

  @media ${maxComputer} {
    font-size: 12px;
  }

  @media ${maxTablet} {
    font-size: 16px;
  }
`;

export const MostPlayedGameContainer = styled(({ ...props }) => <div {...props} />)``;

//grid-area Overall
export const OverrallContainer = styled(({ ...props }) => <div {...props} />)`
  grid-area: Overall;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  flex-direction: column;

  @media ${maxTablet} {
    flex-direction: row;
  }
`;

export const OverallCardContainer2of4 = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  gap: 30px;

  @media ${maxTablet} {
    width: 100%;
    gap: 20px;
  }
`;

export const OverrallCard = styled(({ ...props }) => <div {...props} />)`
  background-color: ${theme.colors.black1F};
  height: 220px;
  max-width: 270px;
  width: 100%;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-basis: 50%;
`;

export const OverrallCardNumber = styled(({ ...props }) => (
  <Typography {...props} variant='h1' weight={500} lineHeight='44px' />
))`
  font-size: 34px;
  margin: 0;
  margin-top: 12px;
`;

//grid-area PreviousRankingsGraph
export const PreviousRankingsGraph = styled(({ ...props }) => <div {...props} />)`
  grid-area: PreviousRankingsGraph;
  background-color: ${theme.colors.black1F};
  padding: 20px 45px;
  height: fit-content;

  @media ${maxTablet} {
    padding: 30px;
  }
`;

export const PreviousRankingsGraphTitle = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={500} />
))`
  margin: 0;
  margin-bottom: 15px;
`;

export const PreviousRankingsGraphContainer = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  max-width: 480px;
  max-height: 320px;
  width: 100%;
  height: 100%;
`;

export const RankingSvg = styled(({ place, ...props }) => <div {...props} />)`
  position: absolute;
  top: 6px;
  left: 13px;

  svg {
    width: 25px;

    @media ${maxMobile} {
      width: 15px;
    }
  }

  @media ${maxMobile} {
    left: 20px;
  }

  @media (max-width: 550px) {
    &:nth-of-type(1) {
      opacity: 0;
    }
  }

  ${({ place }) =>
    (place === 2 &&
      css`
        top: 30px;

        @media ${maxMobile} {
          top: 20px;
        }

        svg,
        path {
          fill: #bcbcbc;
        }
      `) ||
    (place === 3 &&
      css`
        top: 60px;

        @media ${maxMobile} {
          top: 50px;
        }

        @media (max-width: 550px) {
          opacity: 0;
        }

        svg,
        path {
          fill: #793e3e;
        }
      `)}
`;

//grid-area LastCompetition
export const LastCompetition = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  grid-area: LastCompetition;
  background-color: ${theme.colors.black1F};
`;

export const Card = styled(({ ...props }) => <UserLastCompetitionCard {...props} />)`
  padding: 28px 40px;

  @media ${maxTablet} {
    padding: 20px;
  }
`;

export const TextContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
`;

export const Text = styled(({ ...props }) => <span {...props} />)`
  padding: 50px 0px;
  text-align: center;
`;

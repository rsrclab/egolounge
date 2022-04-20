/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import { maxComputer, maxSmallMobile, maxTablet, theme } from "~/styles";
import { Typography, Button as BaseButton } from "~/components";

export const Container = styled(({ ...props }) => <div {...props} />)`
  background-color: ${theme.colors.black1F};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  color: #fff;

  & + & {
    margin-top: 50px;

    @media ${maxTablet} {
      margin-top: 20px;
    }
  }
`;

export const StatName = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={600} />
))`
  margin: 0;
  margin-bottom: 15px;
`;

export const Summary = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Player = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: flex-end;
`;

export const PlayerImageContainer = styled(({ ...props }) => <div {...props} />)`
  span {
    border-radius: 5px;
  }
`;

export const PlayerStats = styled(({ ...props }) => <div {...props} />)`
  margin-left: 15px;

  @media ${maxTablet} {
    margin-left: 5px;
  }
`;

export const PlayerUsername = styled(({ ...props }) => (
  <Typography {...props} variant='h5' weight={600} lineHeight='24px' />
))`
  margin: 0;
  margin-bottom: 5px;
`;

export const PlayerEliminations = styled(({ ...props }) => (
  <Typography {...props} variant='h5' weight={400} lineHeight='24px' />
))`
  margin: 0;
`;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)`
  min-height: 44px;
  height: 44px;

  @media ${maxComputer} {
    min-width: 120px;
    width: 120px;
  }

  @media ${maxSmallMobile} {
    min-width: 80px;
    width: 80px;
  }
`;

export const Text: React.FC = styled(({ ...props }) => <p {...props} />)``;

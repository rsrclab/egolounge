/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import { Button as BaseButton, Typography, Image } from "~/components";
import { maxTablet } from "~/styles";
import { ButtonProps } from "~/types";

export const Container = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  align-content: space-between;
`;

export const InnerContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  position: relative;

  @media ${maxTablet} {
    flex-direction: row;
  }
`;

export const Head = styled(({ ...props }) => <div {...props} />)`
  flex-basis: 50%;
`;

export const Content = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  min-height: 164px;

  @media ${maxTablet} {
    flex-direction: column;
  }
`;

export const Title = styled(({ ...props }) => <Typography {...props} variant='h3' weight={300} />)`
  margin: 0;
`;

export const Name = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={700} lineHeight='24px' />
))`
  margin: 0;
  margin: 13px 0;

  @media ${maxTablet} {
    margin: 10px 0;
  }
`;

export const Date = styled(({ ...props }) => (
  <Typography {...props} variant='h5' weight={400} lineHeight='16px' />
))`
  margin: 0;
  margin-bottom: 24px;
`;

export const Summary = styled(({ ...props }) => <div {...props} />)`
  display: flex;

  @media ${maxTablet} {
    flex-wrap: wrap;
    flex-basis: 50%;
    align-items: flex-end;
    flex-direction: column;
  }
`;

export const Game = styled(({ ...props }) => <div {...props} />)`
  height: 40px;

  @media ${maxTablet} {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

export const Players = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  margin-left: 25px;

  @media ${maxTablet} {
    margin-left: 0;
  }
`;

export const PlayerContainer = styled(({ ...props }) => <div {...props} />)`
  & + & {
    margin-left: -10px;
  }
`;

export const PlayerImage = styled(({ ...props }) => <Image {...props} width={40} height={40} />)`
  border-radius: 5px;
`;

export const OtherUsers = styled(({ ...props }) => <div {...props} />)`
  width: 43px;
  height: 43px;
  background-color: #0e0e0e;
  border-radius: 50%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -10px;
`;

export const PlayerCount = styled(({ ...props }) => (
  <Typography {...props} variant='h6' weight={700} lineHeight='14px' />
))`
  margin: 0;
`;

export const Actions: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const Button = styled(({ ...props }: Omit<ButtonProps, "variant" | "color">) => (
  <BaseButton {...props} variant='contained' color='primary' />
))`
  height: 44px;
  min-height: 44px;

  @media ${maxTablet} {
    width: 100%;
  }
`;

/* eslint-disable jsx-a11y/alt-text */
import styled from "styled-components";
import { theme } from "~/styles";
import { Button, Typography, Image } from "~/components";

export const Container = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  width: 320px;
  padding: 20px;
  background-color: ${theme.colors.black1F};
  border-radius: 15px;
  color: ${theme.colors.white};
`;

export const Head = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled(({ ...props }) => <div {...props} />)``;

export const Name = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={700} lineHeight='24px' />
))`
  margin: 0;
`;

export const Date = styled(({ ...props }) => <Typography {...props} variant='h5' weight={400} />)`
  margin: 10px 0 30px;
`;

export const PlayerContainer = styled(({ ...props }) => <div {...props} />)`
  & + & {
    margin-left: -10px;
  }
`;

export const PlayerCount = styled(({ ...props }) => (
  <Typography {...props} variant='h6' weight={700} lineHeight='14px' />
))`
  margin: 0;
`;

export const Players = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`;

export const PlayerImage = styled(({ ...props }) => <Image {...props} width={40} height={40} />)`
  border-radius: 5px;
`;

export const GameImage = styled(({ width, height, ...props }) => <div {...props} />)``;

export const GameButton = styled(({ ...props }) => (
  <Button {...props} variant='contained' color='primary' />
))`
  width: 100%;
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

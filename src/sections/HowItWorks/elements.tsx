import styled from "styled-components";
import { SectionContainer as BaseSectionContainer } from "~/components";
import { maxMobile, maxLargeScreen, theme } from "~/styles";
import { Typography } from "~/components";
import React from "react";

export { Typography } from "~/components";

export const SectionContainer: React.FC = styled(({ ...props }) => (
  <BaseSectionContainer {...props} direction='column' />
))`
  justify-content: center;
  margin-top: 60px;
  padding: 0 50px;
  color: ${theme.colors.white};
`;

// can't use : React.FC<TypographyProps>
export const Title = styled(({ ...props }) => <Typography variant='h1' {...props} />)`
  text-align: center;
  margin: 0;
`;

export const CardsContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  width: 100%;
  padding-top: 40px;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;

  @media ${maxLargeScreen} {
    width: 700px;
    margin: 0 auto;
    row-gap: 40px;
  }

  @media ${maxMobile} {
    width: 100%;
  }
`;

export const CardContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  width: 320px;
  height: 238px;
  padding: 20px;
  border: 2px solid ${theme.colors.primary};
  border-top: none;
  border-radius: 10px;
  display: flex;

  &:after,
  &:before {
    content: "";
    width: 20%;
    height: 100%;
    position: absolute;
    border-top: 2px solid ${theme.colors.primary};
    top: 0;
  }

  &:after {
    border-top-right-radius: 10px;
    right: -2px;
  }

  &:before {
    border-top-left-radius: 10px;
    left: -2px;
  }

  @media ${maxMobile} {
    max-width: 320px;
  }
`;

export const CardIcon: React.FC = styled(({ ...props }) => <div {...props} />)`
  position: absolute;
  top: -20px;
  left: 50%;
  right: 0;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
`;

export const CardContent: React.FC = styled(({ ...props }) => <div {...props} />)`
  align-self: center;
`;

export const CardTitle: React.FC = styled(({ ...props }) => (
  <Typography variant='h3' {...props} />
))``;

export const CardDescription: React.FC = styled(({ ...props }) => <p {...props} />)`
  width: 280px;
`;

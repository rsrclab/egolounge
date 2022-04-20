import styled from "styled-components";
import { Typography } from "~/components";
import { theme, maxTablet, maxMobile } from "~/styles";
export { SocialButtons } from "~/collections";
export { Typography } from "~/components";

export const SectionContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  column-gap: 95px;
  padding: 75px 110px 55px 150px;

  @media ${maxTablet} {
    padding: 40px 30px 60px;
  }
`;

export const Container = styled(({ ...props }) => <div {...props} />)`
  width: 50%;

  @media ${maxTablet} {
    width: 100%;
  }
`;

export const HowItWorks = styled(({ ...props }) => <div {...props} />)`
  background-color: ${theme.colors.black1F};
  padding: 25px 70px 70px;
  border-radius: 15px;
  width: 50%;

  @media ${maxTablet} {
    display: none;
  }
`;

export const Card = styled(({ ...props }) => <div {...props} />)`
  & + & {
    margin-top: 40px;
  }
`;

export const CardTitle = styled(({ ...props }) => (
  <Typography variant='h2' lineHeight='30px' color='white' {...props} />
))`
  margin-bottom: 10px;

  span {
    color: ${theme.colors.primary};
  }
`;

export const CardDescription = styled(({ ...props }) => (
  <Typography variant='h4' weight={400} {...props} />
))`
  color: ${theme.colors.white};
`;

export const Title = styled(({ ...props }) => <Typography {...props} variant='h2' />)`
  text-align: center;
  margin: 30px 0 15px;
  color: ${theme.colors.primary};
`;

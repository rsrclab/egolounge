import styled from "styled-components";
import {
  Button as BaseButton,
  SectionContainer as BaseSectionContainer,
  Typography
} from "~/components";
import { maxComputer, maxMobile, maxTablet, theme } from "~/styles";

export const SectionContainer = styled(({ ...props }) => (
  <BaseSectionContainer {...props} direction='column' />
))`
  margin: 110px auto 100px;
  align-items: center;
  justify-content: center;
`;

export const ContentContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: ${theme.colors.black1F};
  padding: 70px 180px;
  max-width: 880px;
  width: 100%;
  border-radius: 15px;

  @media ${maxComputer} {
    padding: 70px 120px;
  }

  @media ${maxTablet} {
    padding: 70px;
  }

  @media ${maxMobile} {
    padding: 50px 20px;
  }
`;

export const Subtitle = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={500} lineHeight='30px' color='white' />
))`
  margin: 0;
  font-size: 24px;
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={700} lineHeight='50px' color='white' />
))`
  font-size: 34px;
  margin: 15px 0 40px;
`;

export const Container = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media ${maxTablet} {
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const Countdown = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 160px;
  width: 100%;
  padding: 15px;
  background-color: ${theme.colors.black};
  border: 1px solid ${theme.colors.golden};
  border-radius: 5px;
  color: ${theme.colors.white};

  @media ${maxTablet} {
    max-width: unset;
    width: 45%;
  }

  span {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const CountdownTypography = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={500} lineHeight='50px' />
))`
  margin: 0;
  font-size: 34px;
`;

export const SectionActions = styled(({ ...props }) => <div {...props} />)`
  margin-top: 40px;
  display: flex;
  align-items: center;
  column-gap: 40px;
`;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)``;

import styled from "styled-components";
import {
  Button,
  SectionContainer as BaseSectionContainer,
  Typography,
  SocialButton
} from "~/components";
import { maxTablet, maxMobile, theme } from "~/styles";
import { SocialButtonProps } from "~/types";

export const SectionContainer: React.FC = styled(({ ...props }) => (
  <BaseSectionContainer {...props} />
))`
  margin: 90px auto 110px;

  padding: 0 55px;

  @media ${maxTablet} {
    margin: 60px auto;
    padding: 0 20px;
  }
`;

export const Title: React.FC = styled(({ ...props }) => (
  <Typography variant='h3' color='white' weight='500' lineHeight={32} {...props} />
))`
  max-width: 435px;
  padding-right: 85px;

  @media ${maxTablet} {
    text-align: center;
    margin: 0 auto 30px;
    padding: 0;
  }
`;

export const StyledSocialButton = styled(({ ...props }: SocialButtonProps) => (
  <SocialButton {...props} />
))``;

export const InnerSectionContainer: React.FC = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  padding: 82px 100px;
  background-color: ${theme.colors.black1F};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  @media ${maxTablet} {
    padding: 40px 5px;
    flex-direction: column;
  }
`;

export const DiscordCTALink = styled(({ ...props }) => <a {...props} />)`
  min-width: 160px;
  min-height: 73px;
  background-color: ${theme.colors.blue6a};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 34px;
    height: 38px;
  }

  @media ${maxMobile} {
    min-width: 110px;
    min-height: 53px;
  }
`;

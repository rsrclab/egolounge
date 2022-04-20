import styled, { css } from "styled-components";
import { Typography } from "~/components";
import { maxTablet, theme } from "~/styles";

export const PrivacyPolicyContainer = styled(({ ...props }) => <div {...props} />)`
  max-width: 1440px;
  margin: 100px auto;
  padding: 0 50px;

  @media ${maxTablet} {
    margin: 60px auto;
    padding: 0 25px;
  }
`;

export const LinksContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  column-gap: 70px;

  @media ${maxTablet} {
    flex-direction: column;
    row-gap: 20px;
  }
`;

export const PolicyLink = styled(({ isActive, ...props }) => <a {...props} />)`
  position: relative;
  font-size: 24px;
  font-weight: 600;
  color: ${theme.colors.golden};
  text-decoration: underline;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${theme.colors.white};
      text-decoration: none;
    `}
`;

export const ContentContainer = styled(({ ...props }) => <div {...props} />)`
  margin-top: 50px;

  @media ${maxTablet} {
    margin-top: 40px;
  }
`;

export const PolicyRule = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} lineHeight='24px' color='white' />
))``;

export const TermlyContainer = styled(({ ...props }) => <div {...props} />)``;

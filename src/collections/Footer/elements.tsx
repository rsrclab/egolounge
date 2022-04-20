import styled from "styled-components";
import { SectionContainer as BaseSectionContainer, Typography } from "~/components";
import { maxMobile, theme } from "~/styles";

export const FooterContainer = styled(({ ...props }) => <BaseSectionContainer {...props} />)`
  height: 61px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.black};
`;

export const Copyright = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} />
))`
  margin: auto 0;
  text-align: center;

  @media ${maxMobile} {
    font-size: 10px;
  }
`;

export const TermsAndPoliciesLink = styled(({ ...props }) => <a {...props} />)`
  color: ${theme.colors.golden};
  text-decoration: underline;
  font-size: 16px;
  font-weight: 700;

  @media ${maxMobile} {
    font-size: 10px;
  }
`;

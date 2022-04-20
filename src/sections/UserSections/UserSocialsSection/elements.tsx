import styled from "styled-components";
import { Typography } from "~/components";
import { maxTablet, theme } from "~/styles";

export const Section = styled(({ ...props }) => <div {...props} />)`
  margin: 60px auto 0;

  @media ${maxTablet} {
    margin: 50px auto;
  }
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h3' weight={600} lineHeight='30px' />
))`
  color: ${theme.colors.white};
  margin: 0;
  margin-bottom: 30px;
`;

export const Connected = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={500} />
))`
  margin: 0;
`;

export const Card = styled(({ ...props }) => <div {...props} />)`
  & + & {
    margin-top: 20px;
  }
`;

import styled from "styled-components";
import { theme, maxTablet } from "~/styles";
import { Typography } from "~/components";

export const SectionContainer = styled(({ ...props }) => <div {...props} />)`
  margin: 60px auto 0;
`;

export const HeadContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;

  @media ${maxTablet} {
    margin-bottom: 30px;
  }
`;

export const Title = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={400} lineHeight='30px' />
))`
  color: ${theme.colors.golden};
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Subtitle = styled(({ ...props }) => (
  <Typography {...props} variant='h5' weight={400} lineHeight='24px' />
))`
  color: ${theme.colors.lightGray};
  margin: 0;
  margin-left: 15px;
`;

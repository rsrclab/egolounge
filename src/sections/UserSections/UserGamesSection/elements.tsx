import styled from "styled-components";
import { Typography } from "~/components";
import { theme } from "~/styles";

export const Container = styled(({ ...props }) => <div {...props} />)`
  margin: 60px auto 40px;
`;

export const Title = styled(({ ...props }) => <Typography {...props} variant='h3' weight='700' />)`
  color: ${theme.colors.white};
`;

export const Card = styled(({ ...props }) => <div {...props} />)`
  position: relative;

  & + & {
    margin-top: 20px;
  }
`;

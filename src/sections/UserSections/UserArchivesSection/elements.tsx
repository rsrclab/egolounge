import styled from "styled-components";
import { maxComputer, maxMobile, theme } from "~/styles";

export const Container = styled(({ ...props }) => <div {...props} />)`
  max-width: 1440px;
  padding: 0 50px;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media ${maxComputer} {
    justify-content: center;
  }

  @media ${maxMobile} {
    padding: 0 20px;
    margin: 60px auto;
  }
`;

export const Text = styled(({ ...props }) => <span {...props} />)`
  color: ${theme.colors.white};
  margin: 0 auto;
`;

import styled from "styled-components";
import { theme } from "~/styles";

export const Container: React.FC = styled(({ ...props }) => <div {...props} />)`
  color: ${theme.colors.white};
  max-width: 1340px;
  margin: 85px auto 100px;
  padding: 45px 50px;
  background-color: ${theme.colors.black1F};
  border-radius: 15px;
`;

export const Content: React.FC = styled(({ ...props }) => <div {...props} />)`
  max-width: 790px;
  margin: 0 auto;
  text-align: center;

  span {
    color: ${theme.colors.golden};
  }
`;

export const Text: React.FC = styled(({ ...props }) => <p {...props} />)`
  margin: 0;
  font-size: 34px;
  font-weight: 500;

  & + & {
    margin-top: 12px;
  }
`;

import styled from "styled-components";
import { theme } from "~/styles";

export const Container = styled(({ ...props }) => <div {...props} />)`
  & + & {
    margin-top: 20px;
  }
  padding: 30px;
  border-radius: 15px;
  background-color: ${theme.colors.black1F};
`;

export const Row = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;

  & + & {
    /* margin-top: 30px; */
  }
`;

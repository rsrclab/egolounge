import styled from "styled-components";
import { maxTablet } from "~/styles";

export const CardContainer = styled(({ ...props }) => <div {...props} />)`
  width: 320px;
  height: 185px;
  border-radius: 10px;

  transition: all 500ms ease-in-out;

  img {
    border-radius: 10px;
  }

  @media ${maxTablet} {
    position: relative;
  }
`;

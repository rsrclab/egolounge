import styled from "styled-components";
import { Button } from "~/components";
import { maxTablet } from "~/styles";

export const SocialButton = styled(({ backgroundColor, ...props }) => <Button {...props} />)`
  min-width: 80px;
  width: 80px;
  box-shadow: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-basis: 20%;
  max-width: 80px;

  @media ${maxTablet} {
    min-height: 45px;
    min-width: 45px;
    height: 45px;
    width: 45px;

    svg {
      vertical-align: middle;
      width: 20px;
    }
  }
`;

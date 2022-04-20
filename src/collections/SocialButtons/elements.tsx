import styled from "styled-components";
export { SocialButton } from "~/components";
import { maxTablet } from "~/styles";

export const SocialsContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: center;
  column-gap: 20px;

  h5 {
    margin: 0;
    display: flex;
    align-items: center;
  }

  @media ${maxTablet} {
    column-gap: 10px;
  }
`;

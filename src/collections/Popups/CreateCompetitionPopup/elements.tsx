import styled from "styled-components";
import { Popup as BasePopup, Typography } from "~/components";
import { Hero as BaseHero } from "~/sections";
import { maxSmallMobile, maxTablet, theme } from "~/styles";

export const Popup = styled(({ ...props }) => <BasePopup {...props} width='470px' />)``;

export const Hero = styled(({ ...props }) => <BaseHero {...props} />)`
  h1 {
    font-size: 36px;

    @media ${maxSmallMobile} {
      font-size: 26px;
    }
  }
`;

export const PopupTitle = styled(({ ...props }) => (
  <Typography {...props} variant='h1' color='golden' />
))`
  margin: 0;
  padding: 40px 40px 10px;

  @media ${maxTablet} {
    padding: 30px 15px 0;
    font-size: 28px;
  }
`;

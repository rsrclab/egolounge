import styled from "styled-components";
import { Typography, Popup as BasePopup } from "~/components";
import { theme } from "~/styles";

export const Popup = styled(({ ...props }) => <BasePopup {...props} />)``;

export const Title = styled(({ ...props }) => <Typography {...props} variant='h2' />)`
  padding-bottom: 20px;
  span {
    font-size: 12px;
    vertical-align: middle;
    color: ${theme.colors.darkGray};
    display: block;
  }
`;

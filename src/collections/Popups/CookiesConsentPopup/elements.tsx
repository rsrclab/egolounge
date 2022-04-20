import styled, { css } from "styled-components";
import { Button as BaseButton, Popup as BasePopup, Typography } from "~/components";
import { theme } from "~/styles";

export const Wrapper = styled(({ agreedToCookies, ...props }) => <div {...props} />)`
  //FIXME: Better approach for showing the popup
  ${({ agreedToCookies }) =>
    agreedToCookies &&
    css`
      display: none;
    `}
`;

export const BasePopupContainer = styled(({ ...props }) => (
  <BasePopup {...props} positionInset='auto 40px 5% auto' />
))``;

export const Button = styled(({ ...props }) => (
  <BaseButton {...props} variant='contained' typography={{ variant: "h4", weight: 700 }} />
))`
  width: 100%;
`;

export const PopupTitle = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={600} />
))`
  margin: 20px 0 10px;
`;

export const PopupContent = styled(({ ...props }) => (
  <Typography {...props} variant='h4' weight={400} />
))`
  margin: 0;
  margin-bottom: 45px;

  a {
    margin-left: 5px;
    color: ${theme.colors.golden};
    text-decoration: underline;
    font-weight: 700;
  }
`;

import styled from "styled-components";
import { maxTablet, theme } from "~/styles";
import { Popup as BasePopup, Typography, Button as BaseButton } from "~/components";
import { SocialButtons } from "~/collections";
import { PopupProps } from "~/types";

export const Popup = styled(({ ...props }: PopupProps) => <BasePopup {...props} width='520px' />)``;

export const PopupContainer = styled(({ ...props }) => <div {...props} />)``;

export const SocialsContainer = styled(({ ...props }) => <div {...props} />)`
  margin-top: 50px;
`;

export const SocialsTitle = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={400} />
))`
  a {
    color: ${theme.colors.golden};
    margin-left: 5px;
  }

  @media ${maxTablet} {
    font-size: 20px;
  }
`;

export const Button = styled(({ ...props }) => <BaseButton {...props} variant='contained' />)`
  width: 100%;
  margin-top: 20px;

  @media ${maxTablet} {
    height: 40px;
    min-height: 40px;
  }
`;

export const Socials = styled(({ ...props }) => <SocialButtons {...props} />)`
  margin-top: 30px;
`;

export const RecoverPasswordToggleButton = styled(({ ...props }) => (
  <Button {...props} variant='outlined' />
))`
  background: transparent;
  box-shadow: none;
  border: none;
  min-width: unset;
  width: unset;
  min-height: unset;
  height: unset;
  display: inline-block;

  h5 {
    color: ${theme.colors.golden};
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }
`;

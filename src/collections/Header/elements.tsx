/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { SearchIcon, ChevronIcon } from "~/assets";
import { SignedInDropdown as BaseSignedInDropdown } from "~/collections";
import { Button, Input, Typography, Image } from "~/components";
import { maxMobile, maxTablet, theme } from "~/styles";
import { ButtonProps, InputProps, TypographyProps } from "~/types";

export { Typography, BurgerButton, Button } from "~/components";
export { LoginPopup, MobileMenu } from "~/collections";

export const HeaderContainer = styled(({ ...props }) => <div {...props} />)`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding: 17px 50px;
  background: ${theme.colors.black};
  color: ${theme.colors.whiteFA};
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.6);
  max-height: 80px;

  @media ${maxTablet} {
    padding: 23px 30px;
    display: flex;
    align-items: center;
  }
`;

export const InnerSectionContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  justify-content: space-between;

  @media ${maxTablet} {
    width: 100%;
    min-width: 100%;

    label svg {
      display: none;
    }
  }
`;

export const DiscordLogoContainer = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  flex-basis: 62%;
  max-height: 46px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding-left: 15px;
  }

  svg {
    height: 46px;
    width: 40px;
  }

  @media ${maxTablet} {
    display: none;
  }
`;

export const DiscordText = styled(({ ...props }) => (
  <Typography {...props} variant='h2' weight={700} lineHeight='24px' color='white' />
))<React.FC<TypographyProps>>`
  margin: 0;
  margin: 26px 0;
  font-size: 23px;
`;

export const SiteLogo = styled(({ ...props }) => <div {...props} />)`
  position: absolute;
  display: flex;
  top: 50%;
  bottom: 0;
  right: 50%;
  left: 0;
  transform: translate(50%, -50%);
  margin-top: 5px;
  align-items: center;
  justify-content: center;

  @media ${maxMobile} {
    transform: translate(50%, -50%) scale(75%);
  }
`;

export const UserMenu = styled(({ ...props }) => <div {...props} />)`
  display: flex;
  align-items: center;
  flex-basis: 38%;
  justify-content: flex-end;

  @media ${maxTablet} {
    justify-content: flex-end;
  }
`;

type StyledSignInButtonOmitProps = Omit<ButtonProps, "borderColor" | "shadow" | "color">;

export const SignInButton = styled(({ typography, ...props }: StyledSignInButtonOmitProps) => (
  <Button {...props} color='secondary' variant='outlined' typography={{ variant: "h4" }} />
))`
  min-height: 46px;
  min-width: unset;
  height: 46px;
  width: 115px;
  background: transparent;

  @media ${maxTablet} {
    width: 80px;
    min-width: 80px;
    height: 40px;
    min-height: 40px;

    h4 {
      font-size: 14px;
    }
  }
`;

export const SignedInMenu = styled(
  forwardRef(({ ...props }: any, ref: React.Ref<HTMLDivElement>) => <div {...props} ref={ref} />)
)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
`;

export const SignedInAvatarContainer = styled(({ ...props }) => <div {...props} />)`
  cursor: pointer;
  overflow: hidden;
  cursor: pointer;
  display: flex;

  img,
  span {
    max-width: 46px;
    max-height: 46px;
    border-radius: 5px;
  }

  img {
    border: 1px solid ${theme.colors.golden} !important;
  }
`;

export const SignedInUserAvatar = styled(({ ...props }) => <Image {...props} />)``;

export const SignedInDropdownContainer = styled(({ ...props }) => (
  <div {...props} color={theme.colors.golden} />
))``;

export const SignedInDropdownArrow = styled(({ isOpen, ...props }) => (
  <ChevronIcon {...props} color={theme.colors.golden} />
))`
  cursor: pointer;
  transition: transform 0.2s ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

export const SignedInDropdown = styled(({ ...props }) => <BaseSignedInDropdown {...props} />)`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 999;
`;

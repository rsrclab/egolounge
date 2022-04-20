import Link from "next/link";
import React, { useContext, useRef, useState } from "react";
import * as S from "./elements";
import { DiscordLogo } from "~/assets";
import { PopupContext, UserContext } from "~/context";
import {
  RecoverPasswordPopup,
  EmailSentPopup,
  EmailNotVerifiedPopup,
  NotRegisteredPopup
} from "~/collections";
import { Image } from "~/components";

export const Header: React.FC = ({ ...props }) => {
  const [toggledMobileMenu, setToggledMobileMenu] = useState(false);
  const [toggledSignedInDropdownMenu, setToggleSignedInDropdownMenu] = useState(false);

  const signedInDropdownRef = useRef<HTMLDivElement>(null);

  const { authenticated, user } = useContext(UserContext);

  const { login, forgottenPassword, emailNotVerified, emailSent, reauthenticate, notRegistered } =
    useContext(PopupContext);

  const handleCloseMobileMenu = () => {
    setToggledMobileMenu(false);
  };

  const handleSetMobileMenuToggledOnClick = () => {
    setToggledMobileMenu(prevState => !prevState);
  };

  const handleCloseDropdownMenu = () => {
    setToggleSignedInDropdownMenu(false);
  };

  const handleSetToggleSignedInDropdownMenu = () =>
    setToggleSignedInDropdownMenu(prevState => !prevState);

  return (
    <>
      <S.HeaderContainer {...props}>
        <S.BurgerButton toggled={toggledMobileMenu} onClick={handleSetMobileMenuToggledOnClick} />

        <S.InnerSectionContainer>
          <Link href='https://discord.gg/ego'>
            <a>
              <S.DiscordLogoContainer>
                <DiscordLogo />
                <S.DiscordText>DISCORD</S.DiscordText>
              </S.DiscordLogoContainer>
            </a>
          </Link>
          <S.SiteLogo>
            <Link href='/'>
              <a>
                <Image src='/egoLogo.png' width={145} height={46} alt='egoLogo' />
              </a>
            </Link>
          </S.SiteLogo>
          <S.UserMenu>
            {authenticated === "authenticated" ? (
              <S.SignedInMenu ref={signedInDropdownRef}>
                <S.SignedInAvatarContainer onClick={handleSetToggleSignedInDropdownMenu}>
                  {user?.image?.length && (
                    <S.SignedInUserAvatar
                      src={user.image}
                      width={46}
                      height={46}
                      alt={user.username + " avatar"}
                    />
                  )}
                </S.SignedInAvatarContainer>

                <S.SignedInDropdownContainer>
                  <S.SignedInDropdownArrow
                    onClick={handleSetToggleSignedInDropdownMenu}
                    isOpen={toggledSignedInDropdownMenu}
                  />
                  <S.SignedInDropdown
                    toggled={toggledSignedInDropdownMenu}
                    toggleClose={handleCloseDropdownMenu}
                    noCloseRefs={[signedInDropdownRef]}
                  />
                </S.SignedInDropdownContainer>
              </S.SignedInMenu>
            ) : (
              <S.SignInButton value='SIGN IN' onClick={login.handleOpen} />
            )}
          </S.UserMenu>
        </S.InnerSectionContainer>
        <S.MobileMenu toggled={toggledMobileMenu} handleCloseMenu={handleCloseMobileMenu} />
      </S.HeaderContainer>

      {authenticated === "unauthenticated" && login.toggled && <S.LoginPopup />}
      {forgottenPassword.toggled && <RecoverPasswordPopup />}
      {emailSent.toggled && <EmailSentPopup />}
      {emailNotVerified.toggled && <EmailNotVerifiedPopup />}
      {notRegistered.toggled && <NotRegisteredPopup />}
      {/* {reauthenticate.toggled && <ReauthenticatePopup />} */}
    </>
  );
};

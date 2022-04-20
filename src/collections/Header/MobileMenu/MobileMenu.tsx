import { useContext, useEffect } from "react";
import Link from "next/link";
import * as S from "./elements";
import { Input, Button, Image } from "~/components";
import { SearchIcon } from "~/assets";
import { MobileMenuProps } from "~/types";
import { signOut } from "~/lib";
import { UserContext, PopupContext } from "~/context";
import { useAuthorization } from "~/hooks";
import { SignInButton } from "../elements";

export const MobileMenu: React.FC<MobileMenuProps> = ({ toggled, handleCloseMenu, ...props }) => {
  const { authenticated, user } = useContext(UserContext);
  const {
    login: { handleToggle }
  } = useContext(PopupContext);
  const { actionWithLoggedInAndVerified } = useAuthorization();

  const handleCloseMobileMenuOnSignInClick = () => {
    handleCloseMenu();
    handleToggle();
  };

  const handleMobileMenuForGuestUsers = () =>
    actionWithLoggedInAndVerified(handleCloseMobileMenuOnSignInClick);

  useEffect(() => {
    if (toggled) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [toggled]);

  const handleSignOut = () => {
    signOut();
    handleCloseMenu();
  };

  // TODO: Link with authorization/authentication

  return (
    <S.MobileMenu toggled={toggled} {...props}>
      <S.Content>
        <S.SiteLogo>
          <Link href='/'>
            <a onClick={handleCloseMenu}>
              <Image src='/egoLogo.png' width={145} height={46} alt='egoLogo' />
            </a>
          </Link>
        </S.SiteLogo>
        <S.MenuItems>
          <Link href='/'>
            <a onClick={handleCloseMenu}>
              <S.MenuItem>HOME</S.MenuItem>
            </a>
          </Link>
          {authenticated === "authenticated" && (
            <>
              <Link href='/competitor/my-competitions'>
                <a onClick={handleCloseMenu}>
                  <S.MenuItem>MY COMPETITIONS</S.MenuItem>
                </a>
              </Link>
              <Link href={`/competitor/${user.id}/stats`}>
                <a onClick={handleCloseMenu}>
                  <S.MenuItem>PROFILE</S.MenuItem>
                </a>
              </Link>
              <Link href='/competitor'>
                <a onClick={handleCloseMenu}>
                  <S.MenuItem>ACCOUNT SETTINGS</S.MenuItem>
                </a>
              </Link>
              <Link href={`/competitor/${user.id}/archives`}>
                <a onClick={handleCloseMenu}>
                  <S.MenuItem>ARCHIVES</S.MenuItem>
                </a>
              </Link>
            </>
          )}
        </S.MenuItems>
      </S.Content>

      <S.ButtonContainer>
        {authenticated === "authenticated" ? (
          <Button
            variant='contained'
            color='primary'
            value='LOGOUT'
            typography={{ variant: "h4" }}
            onClick={handleSignOut}
          />
        ) : (
          <SignInButton value='SIGN IN' onClick={handleCloseMobileMenuOnSignInClick} />
        )}
      </S.ButtonContainer>
    </S.MobileMenu>
  );
};

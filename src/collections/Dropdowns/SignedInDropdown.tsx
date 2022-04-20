import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "~/context";
import { signOut } from "~/lib";
import { useAuthorization } from "~/hooks";
import * as S from "./elements";

export const SignedInDropdown = ({ toggled, toggleClose, noCloseRefs, ...props }) => {
  const { user } = useContext(UserContext);

  const handleSignOutOnClick = async e => {
    await signOut();
  };

  return (
    <S.SignedInDropdownMenu
      {...props}
      toggled={toggled}
      toggleClose={toggleClose}
      noCloseRefs={noCloseRefs}
    >
      {user.emailVerified ? (
        <>
          <S.SignedInDropdownItem>
            <Link href='/competitor/my-competitions'>
              <a onClick={toggleClose}>MY COMPETITIONS</a>
            </Link>
          </S.SignedInDropdownItem>
          <S.SignedInDropdownItem>
            <Link href={`/competitor/${user.id}/stats`}>
              <a onClick={toggleClose}>PROFILE</a>
            </Link>
          </S.SignedInDropdownItem>
          <S.SignedInDropdownItem>
            <Link href='/competitor'>
              <a onClick={toggleClose}>ACCOUNT SETTINGS</a>
            </Link>
          </S.SignedInDropdownItem>
          <S.SignedInDropdownItem>
            <Link href={`/competitor/${user.id}/archives`}>
              <a onClick={toggleClose}>ARCHIVES</a>
            </Link>
          </S.SignedInDropdownItem>
        </>
      ) : (
        <EmailNotVerifiedMenu />
      )}
      <S.SignedInDropdownItem>
        <Link href='/'>
          <a onClick={handleSignOutOnClick}>LOGOUT</a>
        </Link>
      </S.SignedInDropdownItem>
    </S.SignedInDropdownMenu>
  );
};

const EmailNotVerifiedMenu: React.FC = () => {
  const { actionWithVerifiedEmail } = useAuthorization();

  const handleEmailNotVerifiedOnClick = () => {
    actionWithVerifiedEmail(() => {});
  };

  return (
    <>
      <S.SignedInDropdownItem onClick={handleEmailNotVerifiedOnClick}>
        <span>MY COMPETITIONS</span>
      </S.SignedInDropdownItem>
      <S.SignedInDropdownItem onClick={handleEmailNotVerifiedOnClick}>
        <span>PROFILE</span>
      </S.SignedInDropdownItem>
      <S.SignedInDropdownItem onClick={handleEmailNotVerifiedOnClick}>
        <span>ACCOUNT SETTINGS</span>
      </S.SignedInDropdownItem>
      <S.SignedInDropdownItem onClick={handleEmailNotVerifiedOnClick}>
        <span>ARCHIVES</span>
      </S.SignedInDropdownItem>
    </>
  );
};

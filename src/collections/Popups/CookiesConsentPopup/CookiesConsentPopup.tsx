import * as S from "./elements";
import { PopupProps } from "~/types";
import { CookiesConsentIcon } from "~/assets";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { PopupContext, UserContext } from "~/context";
import { updateUser } from "~/lib";

export const CookiesConsentPopup: React.FC<
  Omit<PopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ ...props }) => {
  const {
    cookiesConsent: { handleClose, handleToggle, toggled }
  } = useContext(PopupContext);
  const [agreedToCookies, setAgreedToCookies] = useState(false);
  const { user } = useContext(UserContext);
  const isAgreedToCookies = user.agreedToCookies;

  useEffect(() => {
    setAgreedToCookies(localStorage.getItem("agreedToCookies") === "true" || isAgreedToCookies);
    if (agreedToCookies) {
      handleClose();
    }
  }, []);

  const handleAcceptCookies = async () => {
    if (user.authenticated !== "authenticated" && !localStorage.getItem("agreedToCookies")) {
      localStorage.setItem("agreedToCookies", "true");
    } else if (user.id && !isAgreedToCookies && !localStorage.getItem("agreedToCookies")) {
      await updateUser(user.id, { ...user, agreedToCookies: true });
      localStorage.setItem("agreedToCookies", "true");
    }
    setAgreedToCookies(localStorage.getItem("agreedToCookies") === "true" || isAgreedToCookies);

    handleClose();
  };

  return (
    <S.Wrapper agreedToCookies={agreedToCookies}>
      <S.BasePopupContainer
        {...props}
        hasCloseButton={false}
        toggled={!toggled}
        toggleOnClick={handleToggle}
      >
        <CookiesConsentIcon />
        <S.PopupTitle>Cookies Consent</S.PopupTitle>
        <S.PopupContent>
          This website uses cookies to ensure you have the best experience.
          <Link href='/cookies-policy'>
            <a>Learn More</a>
          </Link>
        </S.PopupContent>
        {/* TODO:Implement CookiesConsent popup Accept button logic */}
        <S.Button value='ACCEPT' onClick={handleAcceptCookies} />
      </S.BasePopupContainer>
    </S.Wrapper>
  );
};

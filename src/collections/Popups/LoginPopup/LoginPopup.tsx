import React, { useContext } from "react";
import * as S from "./elements";
import { PopupProps } from "~/types";
import { PopupContext } from "~/context";
import { LoginForm } from "~/collections";

export const LoginPopup: React.FC<Omit<PopupProps, "children" | "toggled" | "toggleOnClick">> = ({
  ...props
}) => {
  const {
    login: { toggled, handleToggle, handleClose },
    forgottenPassword
  } = useContext(PopupContext);

  return (
    <S.Popup
      {...props}
      toggled={toggled}
      toggleOnClick={handleToggle}
      title='Login to your account'
    >
      <S.PopupContainer>
        <LoginForm onSubmit={handleClose} />

        <S.Button onClick={handleClose} href='/register' value='REGISTER' />

        <S.SocialsContainer>
          <S.SocialsTitle>
            Forgot your password?
            <S.RecoverPasswordToggleButton
              value='Click here!'
              onClick={forgottenPassword.handleOpen}
            />
          </S.SocialsTitle>

          <S.Socials />
        </S.SocialsContainer>
      </S.PopupContainer>
    </S.Popup>
  );
};

import { sendEmailVerification } from "firebase/auth";
import { useContext } from "react";
import { DoneIcon } from "~/assets";
import { PopupContext, UserContext } from "~/context";
import { PopupProps } from "~/types";
import { auth } from "../../../lib";

import * as S from "./elements";

export const EmailNotVerifiedPopup: React.FC<
  Omit<PopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ ...props }) => {
  const {
    emailNotVerified: { toggled, handleToggle, handleOpen, handleClose }
  } = useContext(PopupContext);

  const handleResendEmailOnClick = async () => {
    if (!auth?.currentUser || !auth.currentUser?.emailVerified) return;
    try {
      await sendEmailVerification(auth.currentUser);
    } catch (e) {
      console.log(e);
    }
  };

  return toggled ? (
    <S.PopupContainer {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.ContentContainer>
        <S.Title>
          You must verify your email before you are able to join or create any competitions
        </S.Title>
        <S.Actions>
          <S.Button value='CANCEL' onClick={handleClose} />
          <S.Button value='RESEND' onClick={handleResendEmailOnClick} />
        </S.Actions>
      </S.ContentContainer>
    </S.PopupContainer>
  ) : (
    <></>
  );
};

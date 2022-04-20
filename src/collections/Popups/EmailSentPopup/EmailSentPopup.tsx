import { useContext } from "react";
import { DoneIcon } from "~/assets";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";
import * as S from "./elements";

export const EmailSentPopup: React.FC<
  Omit<PopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ ...props }) => {
  const {
    emailSent: { toggled, handleToggle, handleClose }
  } = useContext(PopupContext);

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.ContentContainer>
        <DoneIcon />

        <S.Title>Email sent</S.Title>

        <S.Description>Check your email to reset your password</S.Description>

        <S.Button value='CONTINUE' href='/' onClick={handleClose} />
      </S.ContentContainer>
    </S.Popup>
  );
};

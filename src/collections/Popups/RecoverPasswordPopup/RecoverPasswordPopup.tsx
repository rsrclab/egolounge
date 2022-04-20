import * as S from "./elements";
import { RecoverPasswordForm } from "~/collections";
import { PopupContext } from "~/context";
import { useContext } from "react";
import { PopupProps } from "~/types";

export const RecoverPasswordPopup: React.FC<
  Omit<PopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ ...props }) => {
  const {
    forgottenPassword: { toggled, handleToggle }
  } = useContext(PopupContext);

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.Title>Recover your password</S.Title>

      <RecoverPasswordForm />
    </S.Popup>
  );
};

import * as S from "./elements";
import { SetUsernameForm } from "~/collections";
import { useContext } from "react";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";

export const SetUsernamePopup: React.FC<
  Omit<PopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ ...props }) => {
  const {
    username: { handleToggle, toggled }
  } = useContext(PopupContext);

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.Title>
        Place set a username: <span>(cannot be changed)</span>
      </S.Title>

      <SetUsernameForm />
    </S.Popup>
  );
};

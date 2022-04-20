import { useContext, useState } from "react";
import { PopupProps } from "~/types";
import { PopupContext } from "~/context";
import * as S from "./elements";
import { ReauthenticateForm } from "~/collections";

interface ReauthenticatePopupProps
  extends Omit<PopupProps, "children" | "toggled" | "toggleOnClick"> {
  description?: string;
  submitBtnText?: string;
  onSubmit?: () => void;
  cancelBtnText?: string;
  onCancel?: () => void;
  disableSubmitBtn?: boolean;
}

export const ReauthenticatePopup: React.FC<ReauthenticatePopupProps> = ({
  title,
  description,
  disableSubmitBtn = false,
  submitBtnText = "REAUTHENTICATE",
  onSubmit,
  cancelBtnText = "CANCEL",
  onCancel,
  ...props
}) => {
  const { reauthenticate } = useContext(PopupContext);

  const handleCloseReauthenticatePopupOnClick = () => {
    reauthenticate.handleClose();
  };

  return (
    <S.Popup
      {...props}
      toggled={reauthenticate.toggled}
      toggleOnClick={handleCloseReauthenticatePopupOnClick}
    >
      <ReauthenticateForm
        description={description}
        disableSubmitBtn={disableSubmitBtn}
        submitBtnText={submitBtnText}
        onSubmit={onSubmit}
        cancelBtnText={cancelBtnText}
        onCancel={onCancel}
        closePopupHandle={handleCloseReauthenticatePopupOnClick}
      />
    </S.Popup>
  );
};

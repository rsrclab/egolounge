import { useRouter } from "next/router";
import { useContext } from "react";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";
import * as S from "./elements";

export const NotRegisteredPopup: React.FC<
  Omit<PopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ ...props }) => {
  const router = useRouter();
  const {
    notRegistered: { toggled, handleToggle, handleClose }
  } = useContext(PopupContext);

  const handleRedirectToRegisterPage = () => {
    router.push("/register");
    handleClose();
  };

  return toggled ? (
    <S.PopupContainer {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.ContentContainer>
        <S.Title>You have to be registered to access this functionality.</S.Title>
        <S.Actions>
          <S.Button value='CANCEL' onClick={handleClose} />
          <S.Button value='REGISTER' onClick={handleRedirectToRegisterPage} />
        </S.Actions>
      </S.ContentContainer>
    </S.PopupContainer>
  ) : (
    <></>
  );
};

import { useRouter } from "next/router";
import { useContext } from "react";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";
import * as S from "./elements";

export interface RedirectToAccountPopup
  extends Omit<PopupProps, "children" | "toggled" | "toggleOnClick"> {
  gameName: string;
}

export const RedirectToAccountPopup: React.FC<RedirectToAccountPopup> = ({
  gameName,
  ...props
}) => {
  const router = useRouter();
  const {
    redirectToAccount: { toggled, handleToggle, handleClose }
  } = useContext(PopupContext);

  const handleRedirectToAccountPage = () => {
    router.push("/competitor");
    handleClose();
  };

  return toggled ? (
    <S.PopupContainer {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.ContentContainer>
        <S.Title>
          Please go to Account Settings and link <span>{gameName}</span> to join a competition.
        </S.Title>
        <S.Actions>
          <S.Button value='CANCEL' onClick={handleClose} />
          <S.Button value='ACCOUNT' onClick={handleRedirectToAccountPage} />
        </S.Actions>
      </S.ContentContainer>
    </S.PopupContainer>
  ) : (
    <></>
  );
};

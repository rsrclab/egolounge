import { useContext } from "react";
import { PopupProps } from "~/types";
import { PopupContext } from "~/context";
import * as S from "./elements";

export interface SimplePopupProps extends PopupProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonOnClick?: () => void;
}

export const SimplePopup: React.FC<
  Omit<SimplePopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ title, description, buttonText, buttonOnClick, children, ...props }) => {
  const {
    simple: { toggled, handleToggle, handleClose }
  } = useContext(PopupContext);

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle} padding='40px 15px'>
      <S.Title variant='h3' weight={500}>
        {title}
      </S.Title>
      {description && <S.Description>{description}</S.Description>}
      {children}
      <S.Actions>
        <S.Button value='CANCEL' onClick={handleClose} />

        {buttonText && buttonOnClick && <S.Button value={buttonText} onClick={buttonOnClick} />}
      </S.Actions>
    </S.Popup>
  );
};

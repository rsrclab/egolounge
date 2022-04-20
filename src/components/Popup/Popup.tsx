import React, { useEffect } from "react";
import { PopupProps } from "~/types";
import * as S from "./elements";

export const Popup: React.FC<PopupProps> = ({
  children,
  title,
  width,
  padding,
  toggled,
  toggleOnClick,
  hasCloseButton = true,
  positionInset,
  ...props
}) => {
  return (
    <React.Fragment>
      <S.PopupOverlay {...props} popupToggled={toggled} onClick={toggleOnClick} />
      <S.PopupContainer
        popupToggled={toggled}
        width={width}
        padding={padding}
        positionInset={positionInset}
      >
        <div>
          {hasCloseButton && <S.PopupCloseButton onClick={toggleOnClick} color='primary' />}
          {title && title?.length > 0 && <S.Title>{title}</S.Title>}
          {children}
        </div>
      </S.PopupContainer>
    </React.Fragment>
  );
};

import * as S from "./elements";
import Link from "next/link";
import { DoneIcon } from "~/assets";
import { SocialButtons } from "~/collections";
import { useContext, useState } from "react";
import { PopupContext } from "~/context";
import { PopupProps } from "~/types";

interface CompetitionCodePopupProps extends PopupProps {
  code: string;
}

export const CompetitionCodePopup: React.FC<
  Omit<CompetitionCodePopupProps, "children" | "toggled" | "toggleOnClick">
> = ({ code, ...props }) => {
  const {
    createCompetition: { handleClose: createCompetitionHandleClose },
    competitionCode: { toggled, handleToggle, handleClose }
  } = useContext(PopupContext);
  const [copyToClipboardToggled, setCopyToClipboardToggled] = useState(false);

  const handleSetCopyToClipboardToggled = () => {
    navigator.clipboard.writeText(code);
    setCopyToClipboardToggled(true);

    setTimeout(() => {
      setCopyToClipboardToggled(false);
    }, 3000);
  };

  return (
    <S.Popup {...props} toggled={toggled} toggleOnClick={handleToggle}>
      <S.Content>
        <S.IconContainer>
          <DoneIcon />
        </S.IconContainer>
        <S.CodeContainer>
          <S.Title>Here is your code:</S.Title>
          {copyToClipboardToggled ? (
            <S.CodeContent>Copied...</S.CodeContent>
          ) : (
            <S.CodeContent>
              <span onClick={handleSetCopyToClipboardToggled}>
                {code} <S.CopyToClipboardIcon />
              </span>
            </S.CodeContent>
          )}
        </S.CodeContainer>
        <S.Actions>
          <S.Button href={`/competition/${code}`} value='GO TO COMPETITION' onClick={handleClose} />
        </S.Actions>
        {/* <S.SocialShare>
          <S.Title>Or share with a connected account</S.Title>
          <SocialButtons />
        </S.SocialShare> */}
      </S.Content>
    </S.Popup>
  );
};

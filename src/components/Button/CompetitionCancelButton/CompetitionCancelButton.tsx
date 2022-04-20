import { useContext } from "react";
import { PopupContext } from "~/context";
import * as S from "./elements";

export const CompetitionCancelButton = ({ children, competitionId, ...props }) => {
  const { simple, competitionAction, simpleCompetitionId } = useContext(PopupContext);

  const handleOpenSimplePopup = () => {
    simple.handleOpen("cancel", competitionId);
  };

  const handleCancelCompetitionOnClick = () => {
    // CANCEL COMPETITION
    console.log("CANCEL COMPETITION: ", competitionId);

    // remove competition from current competitions of all involved players
    // delete competition and its id
    // remove competition from state.waitingToStart
    // remove competition from array on server
    // must b waiting to start

    simple.handleClose();
  };

  return (
    <>
      <S.Button {...props} value='CANCEL' onClick={handleOpenSimplePopup} />

      {simple.toggled && competitionAction === "cancel" && competitionId === simpleCompetitionId && (
        <S.SimplePopup
          width='375px'
          title={
            <>
              Would you like to end <S.HighlightText>{competitionId}</S.HighlightText>?
            </>
          }
          buttonText='YES'
          buttonOnClick={handleCancelCompetitionOnClick}
        />
      )}
    </>
  );
};

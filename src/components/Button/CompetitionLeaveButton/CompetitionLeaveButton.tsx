import { useContext } from "react";
import { PopupContext, UserContext } from "~/context";
import * as S from "./elements";

export const CompetitionLeaveButton = ({ children, competitionId, ...props }) => {
  const { simple, competitionAction, simpleCompetitionId } = useContext(PopupContext);
  const { user } = useContext(UserContext);

  const handleOpenSimplePopup = () => {
    simple.handleOpen("leave", competitionId);
  };

  const handleLeaveOnClick = () => {
    // Leave LOGIC
    console.log("LEAVE ON CLICK: ", competitionId, user.id);

    // remove player from competitions.id of competition
    // remove player from state.waitingToStart.id of competition
    // must be waiting to start, so check competition first
    // remove player from competition array on server
    // remove currentCompetition id from player

    simple.handleClose();
  };

  return (
    <>
      <S.Button {...props} value='LEAVE' onClick={handleOpenSimplePopup} />

      {simple.toggled && competitionAction === "leave" && competitionId === simpleCompetitionId && (
        <S.SimplePopup
          width='375px'
          title={
            <>
              Leave <S.HighlightText>{competitionId}</S.HighlightText>?
            </>
          }
          description='You can rejoin using the same code'
          buttonText='YES'
          buttonOnClick={handleLeaveOnClick}
        />
      )}
    </>
  );
};

import { useContext } from "react";
import { PopupContext } from "~/context";
import * as S from "./elements";

export const CompetitionKickButton = ({
  children,
  competitionId,
  targetPlayerId,
  targetPlayerUsername,
  ...props
}) => {
  const { simple, competitionAction, simpleTargetPlayerId, simpleCompetitionId } =
    useContext(PopupContext);

  const handleOpenSimplePopup = () => {
    simple.handleOpen("kick", competitionId, targetPlayerId);
  };

  const handleKickPlayerOnClick = async () => {
    // KICK PLAYER LOGIC
    console.log("KICK PLAYER ON CLICK: ", competitionId, targetPlayerId);

    // remove player from competitions.id of competition
    // remove player from state.waitingToStart.id of competition
    // must be waiting to start, so check competition first
    // remove player from competition array on server
    // remove currentCompetition id from player

    simple.handleClose();
  };

  return (
    <>
      <S.Button {...props} value='KICK' onClick={handleOpenSimplePopup} />

      {simple.toggled &&
        competitionAction === "kick" &&
        competitionId === simpleCompetitionId &&
        targetPlayerId === simpleTargetPlayerId && (
          <S.SimplePopup
            width='375px'
            title={
              <>
                Kick <S.HighlightText>{targetPlayerUsername}</S.HighlightText>? They will not be
                able to rejoin your competition.
              </>
            }
            buttonText='YES'
            buttonOnClick={handleKickPlayerOnClick}
          />
        )}
    </>
  );
};

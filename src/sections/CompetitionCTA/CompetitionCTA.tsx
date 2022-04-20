import { useContext, useEffect, useState } from "react";
import * as S from "./elements";
import { CompetitionCodePopup, CreateCompetitionPopup, JoinCompetitionForm } from "~/collections";
import { UserContext, PopupContext } from "~/context";

import { ComponentWithAuthorization } from "../../components/WithAuthorization";
import { useAuthorization } from "~/hooks";

export const CompetitionCTA: React.FC = ({ ...props }) => {
  const { selectedGame } = useContext(UserContext);
  const { actionWithLoggedInAndVerified } = useAuthorization();

  const {
    code: createdCompetitionCode,
    createCompetition,
    competitionCode
  } = useContext(PopupContext);

  const gameName = selectedGame?.toString().toUpperCase();

  const handleToggleCreateCompetitionPopupOnClick = () =>
    actionWithLoggedInAndVerified(() => createCompetition.handleOpen());

  return (
    <S.SectionContainer {...props}>
      <S.InnerSectionContainer>
        <S.Container>
          <S.Title>Join a competition</S.Title>

          <JoinCompetitionForm />
        </S.Container>

        <S.CreateCompetitionContainer>
          <S.Title>Create a new competition</S.Title>

          <S.Button
            value='CREATE'
            color='primary'
            onClick={handleToggleCreateCompetitionPopupOnClick}
          />
        </S.CreateCompetitionContainer>
        {createCompetition.toggled && (
          <CreateCompetitionPopup gameName={gameName ? gameName : ""} />
        )}
        {competitionCode.toggled && <CompetitionCodePopup code={createdCompetitionCode} />}
      </S.InnerSectionContainer>
    </S.SectionContainer>
  );
};

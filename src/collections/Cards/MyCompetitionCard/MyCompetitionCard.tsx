import React, { useContext, useState } from "react";
import { Collapse } from "~/components";
import { UserContext } from "~/context";
import { games } from "~/data";
import { ICompetitionStats } from "~/types";
import { getDateAndNameOfDay, hourToAmPm } from "~/utils";
import * as S from "./elements";
import { MyCompetitionPlayersData } from "./MyCompetitionPlayersData";

interface MyCompetitionCardProps {
  competition: ICompetitionStats;
}

export const MyCompetitionCard: React.FC<MyCompetitionCardProps> = ({ competition, ...props }) => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [copyToClipboardToggled, setCopyToClipboardToggled] = useState(false);
  const { user } = useContext(UserContext);
  const isOwner = competition.ownerUsername === user.username;

  const handleSetToggleCollapse = () => {
    setToggleCollapse(prevState => !prevState);
  };

  const handleSetCopyToClipboardToggled = e => {
    navigator.clipboard.writeText(competition.id);
    setCopyToClipboardToggled(true);

    setTimeout(() => {
      setCopyToClipboardToggled(false);
    }, 3000);
  };

  const gameProps = games.find(
    g => g.name.toLowerCase() === competition.game.toLowerCase()
  )?.smallLogoImg;

  return (
    <S.Card {...props}>
      <S.CardRow>
        <S.Typography>DATE</S.Typography>
        <S.Typography textAlign='right'>{getDateAndNameOfDay(competition.startsAt)}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>TIME</S.Typography>
        <S.Typography textAlign='right'>{hourToAmPm(competition.startsAt)}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>HOURS</S.Typography>
        <S.Typography textAlign='right'>{competition.duration}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>COMPETITION</S.Typography>
        <S.Typography textAlign='right'>{competition.name}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>ID</S.Typography>
        <S.Typography textAlign='right'>
          {copyToClipboardToggled ? (
            <>Copied...</>
          ) : (
            <S.CompetitionCode onClick={handleSetCopyToClipboardToggled}>
              {competition.id.substring(0, 4) +
                "..." +
                competition.id.substring(competition.id.length - 4)}
              <S.CopyToClipboardIcon />
            </S.CompetitionCode>
          )}
        </S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>GAME</S.Typography>
        <S.ImageContainer>
          <S.Image {...gameProps} />
        </S.ImageContainer>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>CREATOR</S.Typography>
        <S.Typography textAlign='right'>{competition.ownerUsername}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.Typography>PLAYERS</S.Typography>
        <S.Typography textAlign='right'>{competition.playersCount}</S.Typography>
      </S.CardRow>
      <S.CardRow>
        <S.ActionsContainer>
          <S.IconButton aria-label='expand row' size='small' onClick={handleSetToggleCollapse}>
            {toggleCollapse ? <S.KeyboardArrowUp /> : <S.KeyboardArrowDown />}
          </S.IconButton>
          {isOwner ? (
            <S.CompetitionCancelButton competitionId={competition.id} />
          ) : (
            <S.CompetitionLeaveButton competitionId={competition.id} />
          )}
        </S.ActionsContainer>
      </S.CardRow>

      <Collapse in={toggleCollapse} timeout='auto' unmountOnExit>
        {competition.players.map((playerProps, i) => (
          <MyCompetitionPlayersData
            {...playerProps}
            key={playerProps.username + i}
            isOwner={isOwner}
            isYou={playerProps.username === user.username}
            competitionId={competition.id}
          />
        ))}
      </Collapse>
    </S.Card>
  );
};

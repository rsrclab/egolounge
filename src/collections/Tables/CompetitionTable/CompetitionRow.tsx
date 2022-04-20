/* eslint-disable jsx-a11y/alt-text */
import * as S from "./elements";
import React, { useContext, useState } from "react";
import { getDateAndNameOfDay, hourToAmPm } from "~/utils";
import { games } from "~/data";
import { ICompetitionStats } from "~/types";
import { UserContext } from "~/context";

const collapsableColumnConfig = [
  { title: "PLAYER NAME", width: 180, textAlign: "left" },
  { title: "RECENT AVERAGE", width: 210 },
  { title: "MONTHLY BEST", width: 195 },
  { title: "PRIMARY GAME", width: 190 },
  { title: "PROFILE", width: 130 },
  { title: "", width: 150 }
];

interface CompetitionCollapsibleRowProps {
  competitionProps: ICompetitionStats;
  opened?: boolean;
}

export const CompetitionCollapsibleRow: React.FC<CompetitionCollapsibleRowProps> = ({
  competitionProps,
  opened = false,
  ...props
}) => {
  const [openRowToggle, setOpenRowToggle] = useState(opened);
  const [copyToClipboardToggled, setCopyToClipboardToggled] = useState(false);
  const { user } = useContext(UserContext);

  const isOwner = competitionProps.ownerUsername === user.username;

  const handleSetOpenRowToggle = () => {
    setOpenRowToggle(prevState => !prevState);
  };

  const handleSetCopyToClipboardToggled = e => {
    navigator.clipboard.writeText(competitionProps.id);
    setCopyToClipboardToggled(true);

    setTimeout(() => {
      setCopyToClipboardToggled(false);
    }, 3000);
  };

  const game = games.find(icon => icon.name.toUpperCase() === competitionProps.game.toUpperCase());

  return (
    <React.Fragment>
      <S.TableRow {...props}>
        <S.TableCell>
          <S.IconButton aria-label='expand row' size='small' onClick={handleSetOpenRowToggle}>
            {openRowToggle ? <S.KeyboardArrowUp /> : <S.KeyboardArrowDown />}
          </S.IconButton>
        </S.TableCell>
        <S.TableCell textAlign='left'>{getDateAndNameOfDay(competitionProps.startsAt)}</S.TableCell>
        <S.TableCell>{hourToAmPm(competitionProps.startsAt)}</S.TableCell>
        <S.TableCell>{competitionProps.duration}</S.TableCell>
        <S.TableCell>{competitionProps.name}</S.TableCell>
        <S.TableCell>
          {copyToClipboardToggled ? (
            <>Copied...</>
          ) : (
            <S.CompetitionCode onClick={handleSetCopyToClipboardToggled}>
              {competitionProps.id.substring(0, 4) +
                "..." +
                competitionProps.id.substring(competitionProps.id.length - 4)}
              <S.CopyToClipboardIcon />
            </S.CompetitionCode>
          )}
        </S.TableCell>
        <S.TableCell>
          <S.Image {...game?.smallLogoImg} />
        </S.TableCell>
        <S.TableCell>{isOwner ? "You" : competitionProps.ownerUsername}</S.TableCell>
        <S.TableCell>{competitionProps.playersCount}</S.TableCell>
        <S.TableCell>
          {(competitionProps as any).state === "waitingToStart" ? (
            isOwner ? (
              <S.CompetitionCancelButton competitionId={competitionProps.id} />
            ) : (
              <S.CompetitionLeaveButton competitionId={competitionProps.id} />
            )
          ) : (
            <S.ViewCompetitionButton href={`/competition/${competitionProps.id}`}>
              VIEW
            </S.ViewCompetitionButton>
          )}
        </S.TableCell>
      </S.TableRow>
      <S.CollapsedTableRow>
        <S.TableCell colSpan={10}>
          <S.Collapse in={openRowToggle} timeout='auto' unmountOnExit>
            <S.CollapsibleTable>
              <S.TableHead columns={collapsableColumnConfig} />
              <S.TableBody>
                {competitionProps.players.map((player, i) => (
                  <S.CompetitionCollapsedRow
                    key={`${player.id}-${competitionProps.id}-${i}`}
                    {...player}
                    isOwner={isOwner}
                    isYou={player.username === user.username}
                    competitionId={competitionProps.id}
                  />
                ))}
              </S.TableBody>
            </S.CollapsibleTable>
          </S.Collapse>
        </S.TableCell>
      </S.CollapsedTableRow>
    </React.Fragment>
  );
};

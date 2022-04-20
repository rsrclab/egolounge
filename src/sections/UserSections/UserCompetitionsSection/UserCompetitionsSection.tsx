/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useEffect, useState } from "react";
import * as S from "./elements";
import { TableBody, TableHead } from "~/components";
import { useScreenSize } from "~/hooks";
import { tabletBreakpoint } from "~/styles";
import { ColumnProps, ICompetitionStats } from "~/types";
import { CompetitionCollapsibleRow, MyCompetitionCard } from "~/collections";
import { getCompetition } from "~/lib";
import { UserContext } from "~/context";

const renderMobile = screenWidth => screenWidth <= tabletBreakpoint;

interface MyCompetitionProps {
  startsAt: Date;
  duration: string;
  name: string;
  id: string;
  game: string;
  ownerUsername: string;
  playersCount: number;
  state: "inProgress" | "waitingToStart";
  players: {
    id: string;
    username: string;
    recentAverage: string;
    monthlyBest: string;
    primaryGame: string;
    avatar: string;
  }[];
}

const columnsConfig: ColumnProps[] = [
  { title: "", width: 30 },
  { title: "DATE", width: 140, textAlign: "left" },
  { title: "TIME", width: 130 },
  { title: "HOURS", width: 130 },
  { title: "COMPETITION", width: 245 },
  { title: "ID", width: 155 },
  { title: "GAME", width: 100 },
  { title: "CREATOR", width: 135 },
  { title: "PLAYERS", width: 120 },
  { title: "", width: 150 }
];

export const UserCompetitionsSection = ({ ...props }) => {
  const [myCompetitions, setMyCompetitions] = useState<ICompetitionStats[]>([]);
  const [showMobile, setShowMobile] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const initCompetitions = async () => {
      const allCompetitions: ICompetitionStats[] = [];

      const { toStartIds, inProgressIds } = await getCompetition("state");
      const currentUserComps = [...toStartIds, ...inProgressIds].filter(({ players }) =>
        players.find(({ id }) => id === user.id)
      );

      for (const playerCompetition of currentUserComps) {
        const competition: ICompetitionStats & { state: string } = {
          id: playerCompetition.id,
          name: playerCompetition.name,
          duration: `${playerCompetition.duration} hours`,
          startsAt: new Date(playerCompetition.startsAt),
          game: playerCompetition.game,
          ownerUsername: playerCompetition.players[0].username, // not exactly the owner
          playersCount: playerCompetition.players.length,
          state: playerCompetition.state,
          players: [
            ...playerCompetition.players.map(p => {
              return {
                id: p.id,
                username: p.username,
                monthlyBest: p.monthlyBest,
                recentAverage: p.recentAverage,
                primaryGame: p.primaryGame,
                avatar: p.image
              };
            })
          ]
        };

        allCompetitions.push(competition);
      }

      setMyCompetitions(allCompetitions);
    };

    initCompetitions();
  }, []);

  const { screenWidth } = useScreenSize();
  useEffect(() => {
    if (renderMobile(screenWidth)) {
      setShowMobile(true);
    } else {
      setShowMobile(false);
    }
  }, [screenWidth]);

  console.log(myCompetitions);

  return (
    <S.SectionContainer {...props}>
      <S.DesktopWrapper showContainer={!showMobile}>
        <S.CompetitionsTable>
          <TableHead columns={columnsConfig} />
          <TableBody>
            {myCompetitions.map((competitionProps, i) => (
              <CompetitionCollapsibleRow
                key={`comp-row-${competitionProps.id}-${i}`}
                competitionProps={competitionProps}
              />
            ))}
          </TableBody>
        </S.CompetitionsTable>
      </S.DesktopWrapper>

      <S.MobileWrapper showContainer={showMobile}>
        {myCompetitions.map((competition, i) => (
          <MyCompetitionCard key={`card-${i}-${competition.id}`} competition={competition} />
        ))}
      </S.MobileWrapper>
    </S.SectionContainer>
  );
};

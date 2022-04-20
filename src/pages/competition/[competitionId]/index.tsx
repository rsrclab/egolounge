import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Hero,
  Games,
  CompetitionCTA,
  CompetitionStats,
  DiscordCTA,
  HowItWorks,
  TimerSection,
  FinishedCompetitionStats
} from "~/sections";
import { io } from "socket.io-client";
import { axiosInstance } from "~/lib";

interface CompetitionPageProps {
  competition: any;
}

const CompetitionPage: NextPage<CompetitionPageProps> = ({ competition }) => {
  // const competitionData = JSON.parse(competition);
  const [competitionData, setCompetitionData] = useState(
    competition ? JSON.parse(competition) : {}
  );
  const [competitionState, setCompetitionState] = useState<
    "waitingToStart" | "inProgress" | "finished" | "noCompetition" | "aborted"
  >(competitionData?.state || "noCompetition");
  const [playersCount, setPlayersCount] = useState(
    competitionData?.state ? competitionData.players.length : 0
  );

  useEffect(() => {
    competitionData &&
      setCompetitionData(prevData => ({
        ...prevData,
        players: competitionData.players?.sort(
          (playerA, playerB) => playerA?.stats?.rank - playerB?.stats?.rank
        )
      }));
  }, []);

  useEffect(() => {
    const socket = io(
      `${window?.location?.hostname}${
        window?.location?.hostname.includes("localhost") ? ":3000" : ""
      }`,
      {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        transports: ["websocket"],
        agent: false,
        upgrade: false,
        rejectUnauthorized: false
      }
    );

    socket.on("connect", () => {
      const competitionIdEvent = "competition:" + (competitionData as any).id;

      socket?.emit(`joinCompetitionRoom:${(competitionData as any).id}`, competitionIdEvent);

      socket?.on(`${competitionIdEvent}-playerJoined`, newPlayerCount => {
        setPlayersCount(newPlayerCount);
      });

      socket?.on(`${competitionIdEvent}-inProgress`, playersStatsData => {
        setCompetitionState("inProgress");
        setCompetitionData(prevData => ({ ...prevData, players: playersStatsData }));
      });

      socket?.on(`${competitionIdEvent}-finished`, playersStatsData => {
        setCompetitionState("finished");

        socket.disconnect();
      });

      socket?.on(`${competitionIdEvent}-aborted-not-enough-players`, () => {
        setCompetitionState("aborted");
      });

      socket?.on(`${competitionIdEvent}-newStats`, playersStatsData => {
        setCompetitionData(prevData => ({
          ...prevData,
          players: playersStatsData.sort(
            (playerA, playerB) => playerA?.stats?.rank - playerB?.stats?.rank
          )
        }));
      });
    });

    return () => {
      socket?.disconnect();
    };
  }, [competition]);

  return (
    <main>
      <Hero text='COMPETE' />
      <Games />
      <CompetitionCTA />
      {/** FIXME: Styling elements */}
      {competitionState === "noCompetition" && (
        <div style={{ color: "darkred", margin: "50px", textAlign: "center", fontSize: 40 }}>
          Competition does not exist!
        </div>
      )}
      {competitionState === "aborted" && (
        <div style={{ color: "darkred", margin: "50px", textAlign: "center", fontSize: 40 }}>
          Competition was aborted due to not enough players!
        </div>
      )}
      {competitionState === "waitingToStart" && competitionData && (
        <TimerSection
          name={(competitionData as any).name}
          playersCount={playersCount}
          startsAt={new Date((competitionData as any).startsAt)}
        />
      )}
      {competitionState === "inProgress" && competitionData && (
        <CompetitionStats competition={competitionData} competitionState={competitionState} />
      )}
      {competitionState === "finished" && competitionData && (
        <FinishedCompetitionStats
          competition={competitionData}
          competitionState={competitionState}
        />
      )}
      <HowItWorks />
      <DiscordCTA />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.competitionId) {
    try {
      const getCompetitionRes = await axiosInstance.get(
        `/api/competition/read?competitionId=${query.competitionId}`
      );

      const competition = getCompetitionRes.data?.competition;

      if (competition && Object.keys(competition).length > 0) {
        return {
          props: {
            competition: JSON.stringify({
              ...competition,
              startsAt: new Date(competition.startsAt),
              id: query.competitionId
            })
          }
        };
      }
    } catch (e) {
      console.log("error in getting comp competition/[competitionId]");
      console.log(e);
    }
  }

  return { props: { competition: null } };
};

export default CompetitionPage;

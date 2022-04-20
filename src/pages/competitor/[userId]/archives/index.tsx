import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Hero, UserArchivesSection } from "~/sections";
import { getAllUserCompetitions } from "~/lib";

export interface AccountHistoryProps {
  user: {
    competitions: {
      all: any;
    };
  };
}

const AccountHistory: NextPage<AccountHistoryProps> = () => {
  const router = useRouter();
  const [historicalCompetitions, setHistoricalCompetitions] = useState([]);

  useEffect(() => {
    const getCompetitionsData = async () => {
      const userId = router.query.userId;

      if (userId) {
        const userComps: any = await getAllUserCompetitions(userId as string);

        if (userComps?.length > 0) {
          const competitionsToRender = userComps.map(competitionData => ({
            id: competitionData.id,
            duration: competitionData.duration,
            startsAt: new Date(competitionData.date),
            name: competitionData.name,
            players: competitionData.players,
            gameName: competitionData.game
          }));

          setHistoricalCompetitions(competitionsToRender);
        }
      }
    };

    getCompetitionsData();
  }, []);
  // const userCompetitionsData = JSON.parse(user.competitions.all);

  return (
    <main>
      <Hero heroImgPath='/static/img/banners/bannerArchives.png' />
      <UserArchivesSection competitions={historicalCompetitions} />
    </main>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const userId = query?.userid;

//   if (userId) {
//     const userComps: any = await getAllUserCompetitions(userId as string);

//     if (userComps?.length > 0) {
//       const competitionsToRender = userComps.map(competitionData => ({
//         id: competitionData.id,
//         duration: competitionData.duration,
//         startsAt: competitionData.date?.toDate(),
//         name: competitionData.name,
//         players: competitionData.players,
//         gameName: competitionData.game
//       }));

//       return { props: { user: { competitions: { all: JSON.stringify(competitionsToRender) } } } };
//     }

//     return { props: { user: { competitions: { all: [] } } } };
//   }

//   return { props: { user: { competitions: { all: [] } } } };
// };

export default AccountHistory;

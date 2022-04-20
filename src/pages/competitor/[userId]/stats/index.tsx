import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Hero, UserStatsSection } from "~/sections";
import { axiosInstance } from "~/lib";

interface NextPageProps {
  user: any;
}

const AccountStats: NextPage<NextPageProps> = ({ user }) => {
  console.log(JSON.parse(user));
  return (
    <main>
      <Hero text={JSON.parse(user).username.toUpperCase()} />
      {user ? (
        <UserStatsSection user={JSON.parse(user)} />
      ) : (
        <div style={{ textAlign: "center", color: "white", padding: "48px 0" }}>
          USER DOES NOT EXIST!
        </div>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.userId) {
    try {
      const userRes = await axiosInstance.get(`/api/competitor/read?userId=${query.userId}`);

      if (userRes.data && Object.keys(userRes.data).length > 0)
        return { props: { user: JSON.stringify({ ...userRes.data.user, id: query.userId }) } };
    } catch (e) {
      console.log(e);
    }
  }

  return { props: { user: null } };
};

export default AccountStats;

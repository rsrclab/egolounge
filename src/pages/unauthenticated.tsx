import type { NextPage } from "next";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "~/context";

const Unauthenticated: NextPage = () => {
  const { authenticated } = useContext(UserContext);
  const router = useRouter();

  if (typeof window !== "undefined") {
    if (authenticated === "authenticated") {
      router.push("/");
    }
  }

  return (
    <>
      <main>
        <h1 style={{ textAlign: "center", color: "white" }}>Please log In</h1>
      </main>
    </>
  );
};

export default Unauthenticated;

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { UserContext } from "~/context";

export const useAuthentication = () => {
  const { authenticated } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && authenticated === "unauthenticated") {
      router.push("/unauthenticated");
    }
  }, [authenticated]);

  return { authenticated };
};

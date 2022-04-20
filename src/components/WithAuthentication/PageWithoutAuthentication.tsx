/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "~/context";

export const PageWithoutAuthentication = PageWithoutAuthentication => {
  return props => {
    const { authenticated } = useContext(UserContext);
    const router = useRouter();

    if (typeof window !== "undefined" && authenticated === "authenticated") {
      router.push("/");

      return null;
    }

    return <PageWithoutAuthentication {...props} />;
  };
};

import React, { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { IUser } from "~/types";
import { defaultUser } from "~/data";
import { updateUser } from "../lib/firebase/users";
import { auth, axiosInstance, signInWithCustomTokenWrapper } from "~/lib";
import { User } from "firebase/auth";
import { checkCookies, getCookie, removeCookies } from "cookies-next";

interface UserContextProps {
  user: IUser;
  selectedGame?: IUser["selectedGame"];
  authenticated: IUser["authenticated"];
  setUserField: (fieldName: string, fieldValue: string | number | boolean) => void;
}

const defaultUserContext: UserContextProps = {
  authenticated: "loading",
  selectedGame: null,
  user: defaultUser,
  setUserField: (fieldName, fieldValue) => {}
};

export const UserContext = createContext<UserContextProps>(defaultUserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<IUser>(defaultUser);

  const checkIfThereIsThirdPartyCustomToken = async () => {
    const isCustomTokenCookie = checkCookies("custom-token");
    if (isCustomTokenCookie) {
      const customTokenCookie = getCookie("custom-token");
      try {
        signInWithCustomTokenWrapper(customTokenCookie as string);
        removeCookies("custom-token");
      } catch (error) {
        //pass
      }
    }
  };

  const setUserSelectedGame = (selectedGame: IUser["selectedGame"]) => {
    setUser(prevUser => ({ ...prevUser, selectedGame }));
  };

  const setUserAuthenticated = (authenticated: IUser["authenticated"]) => {
    setUser(prevUser => ({ ...prevUser, authenticated }));
  };

  const setUserField = (fieldName, fieldValue) => {
    setUser(prevUser => ({ ...prevUser, [fieldName]: fieldValue }));
  };

  const getUserInfo = async (authUser: User) => {
    const userRes = await axiosInstance.get(`/api/competitor/read?userId=${authUser.uid}`);

    const dbUser = userRes.data.user;

    if (authUser.emailVerified && !dbUser.emailVerified) {
      await updateUser(authUser.uid, {
        emailVerified: authUser.emailVerified,
        email: authUser.email
      });
    }

    setUser(prev => ({
      ...prev,
      ...dbUser,
      id: authUser.uid,
      emailVerified: authUser.emailVerified,
      email: authUser.email || "",
      authenticated: "authenticated"
    }));
  };

  useEffect(() => {
    checkIfThereIsThirdPartyCustomToken();
    const unsub = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        getUserInfo(userAuth);
      } else {
        setUser(prev => ({
          ...prev,
          ...defaultUser,
          selectedGame: null,
          authenticated: "unauthenticated"
        }));
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (user.authenticated === "loading") return null;

  return (
    <UserContext.Provider
      value={{
        authenticated: user.authenticated,
        user,
        selectedGame: user.selectedGame,
        setUserField
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
  signInWithCustomToken,
  updatePassword
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { IUserInput } from "~/types";
import { createUser, getUserByEmail, updateUser } from "./users";
import { axiosInstance } from "../axios";
import { firebaseErrorHandler } from "../../utils/firebaseErrorHandlers";
import { isDevMode } from "../../utils";

// following type according to https://firebase.google.com/docs/auth/custom-email-handler
export type FirebaseActionParams = {
  mode: "resetPassword" | "recoverEmail" | "verifyEmail";
  oobCode: string;
  apiKey: string;
  continueUrl?: string;
  lang?: string;
};

const clientCredentials: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
};

export const firebaseApp: FirebaseApp =
  getApps().length === 0
    ? initializeApp(clientCredentials, "firebase-client")
    : getApp("firebase-client");

export const firestore = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);

export const auth = getAuth(firebaseApp);

export const createUserOfficalProviderStrategy = async (
  authProvider: FacebookAuthProvider | TwitterAuthProvider | OAuthProvider
) => {
  try {
    const { user } = await signInWithPopup(auth, authProvider);
    if (user.email) {
      const userByEmail = await getUserByEmail(user.email);
      if (!userByEmail) {
        await createUser(user.uid, { email: user.email, username: user.displayName ?? "" });
        return true;
      } else {
        if (userByEmail.uid === user.uid) return true;

        await user.delete();
        const token = await getGeneratedCustomAuthToken(userByEmail.uid);
        await signInWithCustomTokenWrapper(token);
        return true;
      }
    }
    return false;
  } catch (e) {
    console.log("e", e);
    return firebaseErrorHandler(e);
  }
};
export const createUserLocalStrategy = async (user: IUserInput) => {
  const usernameExistsAlready = false;
  if (!usernameExistsAlready) {
    const userByEmail = await getUserByEmail(user.email);
    if (!userByEmail) {
      const res = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const dbUserToCreate: Omit<IUserInput, "password" | "confirmPassword"> = {
        agreedToToS: user.agreedToToS,
        username: user.username,
        email: user.email
      };
      await createUser(res?.user?.uid, dbUserToCreate);
      if (auth?.currentUser) await sendEmailVerification(auth.currentUser);
      return res.user;
    } else {
      const token = await getGeneratedCustomAuthToken(userByEmail.uid);
      await updateUser(userByEmail.uid, {
        agreedToToS: user.agreedToToS,
        username: user.username
      });

      const loginUser = await signInWithCustomTokenWrapper(token);
      if (loginUser) {
        await updatePassword(loginUser.user, user.password);
      }
    }
  }

  return null;
};

export const signInUserLocalStrategy = async (user: Pick<IUserInput, "email" | "password">) => {
  const userRes = await signInWithEmailAndPassword(auth, user.email, user.password);

  return userRes;
};
export const signInWithPopupWrapper = async (
  provider: typeof FacebookAuthProvider | typeof TwitterAuthProvider | typeof OAuthProvider,
  providerExtraArg?: string
) => {
  let authProvider: FacebookAuthProvider | TwitterAuthProvider | OAuthProvider;

  if (providerExtraArg && providerExtraArg.length > 0) {
    authProvider = new provider(providerExtraArg);

    console.log("here");
    if (providerExtraArg === "microsoft.com") {
      const defaultScopes = ["xboxlive.signin", "xboxlive.offline_access"];
      authProvider.addScope(defaultScopes.join(" "));
      authProvider.setCustomParameters({
        approval_prompt: "auto",
        grant_type: "password"
      });
    }
  } else {
    authProvider = new (provider as typeof FacebookAuthProvider | typeof TwitterAuthProvider)();
  }
  return await createUserOfficalProviderStrategy(authProvider);
};

export const signInWithCustomTokenWrapper = async (customeToken: string) => {
  try {
    const res = await signInWithCustomToken(auth, customeToken);
    return res;
  } catch (e) {
    firebaseErrorHandler(e);
    return null;
  }
  // });
};

export const getGeneratedCustomAuthToken = async (uid: string) => {
  const token = await axiosInstance.post("/api/auth/fire/generatecustomtoken", {
    uid
  });
  if (token.data.success) {
    return token.data.body as string;
  }
  return "";
};
export const signOut = async () => await auth.signOut();

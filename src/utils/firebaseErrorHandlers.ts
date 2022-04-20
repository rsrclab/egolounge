import { FirebaseError } from "firebase/app";
export const firebaseErrorHandler = (error: unknown) => {
  if (error instanceof FirebaseError) {
    if (error.code === "auth/popup-closed-by-user") return;
    alert(error.message);
  }
};

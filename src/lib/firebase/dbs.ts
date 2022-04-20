import { collection } from "firebase/firestore";
import { firestore } from ".";

export const dbs = firestore && {
  users: collection(firestore, "users")
};

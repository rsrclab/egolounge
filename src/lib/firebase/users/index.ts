import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { getAuth, sendEmailVerification, updateEmail, updatePassword, User } from "firebase/auth";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch
} from "firebase/firestore";
import { IUserDb, IUserInput, LoLStats } from "~/types";
import { CompetitionState } from "..";
import { firestore, storage } from "../init";

const usersCollection = "users";

export const getUser = async (uid: string) => {
  try {
    console.log("uid", uid);
    const res = await getDoc(doc(firestore, usersCollection, uid));
    return res.data() || {};
  } catch (e) {
    console.log(e);
    console.log("01 code");
    return {};
  }
};

type GetUserByEmailType = { uid: string; additionalInfos: IUserDb };
export const getUserByEmail = async (email: string): Promise<GetUserByEmailType | null> => {
  try {
    const q = query(collection(firestore, usersCollection), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const resObj = { uid: "", additionalInfos: null };
    querySnapshot.forEach(doc => {
      Object.assign(resObj, { uid: doc.id, additionalInfos: doc.data() });
    });
    if (resObj.additionalInfos === null) {
      return null;
    }

    return { uid: resObj.uid, additionalInfos: resObj.additionalInfos as IUserDb };
  } catch (e) {
    return null;
  }
};

export const getUsers = async (uids: string[]) => {
  try {
    const res = query(collection(firestore, usersCollection), where(documentId(), "in", uids));

    const usersData = await getDocs(res);

    return usersData.docs;
  } catch (e) {
    console.log(e);
    console.log("02 code");
    return {};
  }
};

const defaultImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/ego-lounge-cf4f1.appspot.com/o/users%2Fplayer1.png?alt=media&token=0eb34082-a0e7-42ee-b4b7-43b9a893f9a7";

export const defaultUser: IUserDb = {
  email: "",
  emailVerified: false,
  agreedToCookies: false,
  image: defaultImageUrl,
  competitions: {
    competitionsCount: 0,
    won: 0,
    top3: 0,
    bestScore: 0,
    lastTenRanks: [],
    all: []
  }
};

export const createUser = async (uid: string, userData: Pick<IUserInput, "email" | "username">) => {
  try {
    const res = await setDoc(doc(firestore, usersCollection, uid), { ...defaultUser, ...userData });

    console.log(res);
  } catch (e) {
    console.log(e);
    console.log("03 code");
  }
};

export const updateUser = async (uid: string, userData: IUserDb | any) => {
  const batch = writeBatch(firestore);
  const userRef = doc(firestore, usersCollection, uid);
  batch.set(userRef, userData, { merge: true });
  await batch.commit();
};

export const updateUserAvatar = async (uid, file: Blob) => {
  try {
    const storageRef = ref(storage, "users/" + uid + "/");

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);

    // Upload completed successfully, now we can get the download URL
    const downloadURL = await getDownloadURL(await snapshot.ref);

    await updateUser(uid, {
      image: downloadURL
    });

    return downloadURL;
  } catch (e) {
    console.log(e);
    console.log("04 code");
  }

  return null;
};

export const updateUserProfile = async (
  email: string | null,
  password: string | null,
  primaryGame
) => {
  try {
    const auth = getAuth();

    if (auth.currentUser) {
      if (email) {
        await updateEmail(auth.currentUser, email);

        // update user object in firestore as well
        if (auth.currentUser?.uid)
          await updateUser(auth.currentUser?.uid, {
            email,
            primaryGame
          });

        // send verificatin link to new email
        await sendEmailVerification(auth.currentUser);
      }

      // update password
      if (password) await updatePassword(auth.currentUser, password);
    }
  } catch (e) {
    console.log("Error updating profile: ", e);
  }
};

// FIXME: newPrimaryGame type, take from IGame
export const updateUserPrimaryGame = async (uid: string, newPrimaryGame: string) => {
  try {
    await updateDoc(doc(firestore, usersCollection, uid), {
      primaryGame: newPrimaryGame
    });
  } catch (e) {
    console.log(e);
    console.log("05 code");
  }
};

export const updateUserCompetitionsOnCompetitionFinished = async (
  userId: string,
  finishedCompetitionData: CompetitionState
) => {
  const userToUpdate = await getUser(userId);

  const playerStatsForCompetition = finishedCompetitionData.players.find(({ id }) => id === userId)
    ?.stats as LoLStats;

  const oldTenRanks =
    userToUpdate.competitions.lastTenRanks?.length > 0
      ? userToUpdate.competitions.lastTenRanks.slice(0, 9)
      : [];
  const newScore = playerStatsForCompetition.rank;
  const newLastTenRanks = [newScore, ...oldTenRanks];

  const currentCompetitionToRemoveIndex = userToUpdate.competitions.current.findIndex(
    ({ id }) => id === finishedCompetitionData.id
  );
  userToUpdate.competitions.current.splice(currentCompetitionToRemoveIndex);

  const competitionToAdd = {
    id: finishedCompetitionData.id,
    date: finishedCompetitionData.startsAt.valueOf(),
    duration: finishedCompetitionData.duration,
    playersCount: finishedCompetitionData.players.length,
    players: finishedCompetitionData.players.map(({ id, image }) => ({
      id,
      playerImgSrc: image
    })),
    rank: playerStatsForCompetition.rank,
    game: finishedCompetitionData.game,
    stats: playerStatsForCompetition,
    name: finishedCompetitionData.name
  };

  userToUpdate.competitions?.all?.push(competitionToAdd);

  const wonCompetitionsCount =
    playerStatsForCompetition.rank === 1
      ? userToUpdate.competitions.won + 1
      : userToUpdate.competitions?.won || 0;

  const top3CompetitionsCount =
    playerStatsForCompetition.rank < 4 && playerStatsForCompetition.rank > 0
      ? userToUpdate.competitions.top3 + 1
      : userToUpdate.competitions.top3 || 0;

  const playerBestScore =
    userToUpdate.competitions.all?.length > 0
      ? userToUpdate.competitions.all.reduce(
          (accumulatedValue, currentCompetition) =>
            currentCompetition.stats.score > accumulatedValue
              ? currentCompetition.stats.score
              : accumulatedValue,
          0
        )
      : playerStatsForCompetition?.score || 0;

  try {
    await updateDoc(doc(firestore, usersCollection, userId), {
      competitions: {
        ...userToUpdate.competitions,
        bestScore: playerBestScore,
        lastTenRanks: newLastTenRanks,
        competitionsCount: userToUpdate.competitions?.all?.length || 0,
        top3: top3CompetitionsCount,
        won: wonCompetitionsCount
      }
    });
  } catch (e) {
    console.log("error in updating user competitions");
    console.log(e);
    console.log("data");
    console.log({
      competitions: {
        ...userToUpdate.competitions,

        bestScore: playerBestScore,
        lastTenRanks: newLastTenRanks,
        competitionsCount: userToUpdate.competitions?.all?.length || 0,
        top3: top3CompetitionsCount,
        won: wonCompetitionsCount
      }
    });
  }
};

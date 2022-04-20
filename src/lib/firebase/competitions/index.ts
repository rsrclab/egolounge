import axios from "axios";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
  deleteDoc
} from "firebase/firestore";
import { ICompetitionFormInput, ICompetitionPlayer, IGame } from "~/types";
import { firestore } from "../init";
import { updateUser } from "../users";

// competition collection name
const competitionCollection = "competitions";

// Get all competitions of current user
export const getAllCompetitionCreatedByCurrentUser = async (uid: string) => {
  try {
    const res = await query(collection(firestore, competitionCollection), where("uid", "==", uid));
    const querySnapshot = await getDocs(res);
    return querySnapshot;
  } catch (e) {
    console.log(e);
    console.log("1 code");
    return {};
  }
};

export const getCompetition = async (uid: string) => {
  try {
    const res: DocumentSnapshot<any> = await getDoc(doc(firestore, competitionCollection, uid));

    return { ...res.data() } || {};
  } catch (e) {
    console.log(e);
    console.log("2 code");
    return {};
  }
};

export const getAllUserCompetitions = async (userUid: string) => {
  try {
    const userRef = doc(firestore, "users", userUid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    return userData?.competitions.all.slice(0, 12) || [];

    // console.log(userData?.competitions?.all);
    // const competitionsToRender = userData?.competitions.all.map(competitionData => ({
    //   id: competitionData.id,
    //   duration: competitionData.duration,
    //   startsAt: competitionData.date,
    //   name: competitionData.name,
    //   players: competitionData.players,
    //   gameName: competitionData.game
    // }));
    // const competitionsQuery = await query(
    //   collection(firestore, competitionCollection),
    //   where(
    //     documentId(),
    //     "in",
    //     (userData as any).competitions.all.slice(0, 10).map(({ id }) => id)
    //   ) // FIXME: THIS APPROACH CAN GET A MAX OF 10 ITEMS
    // );

    // const competitionsData = await getDocs(competitionsQuery);

    // console.log((userData as any).competitions.all.slice(0, 10));

    // return competitionsData.docs;
    // return competitionsToRender;
  } catch (e) {
    console.log(e);
    console.log("3 code");
    return {};
  }
};

// Create a competition
export const createCompetition = async (uid, competitionData: ICompetitionFormInput) => {
  try {
    console.log("create", competitionData.startsAt);

    const res = await addDoc(collection(firestore, competitionCollection), {
      ...competitionData,
      startsAt: competitionData.startsAt
    });

    const competitionId = res.id;

    const stateCompetitionDefaultData: CompetitionState = {
      id: competitionId,
      startsAt: competitionData.startsAt,
      duration: competitionData.duration,
      state: competitionData.state,
      game: competitionData.game,
      name: competitionData.name,
      players: [...competitionData.players]
    };

    await addCompetitionToAUser(uid, competitionId);
    await addCompetitionToCompetitionStateToStart(stateCompetitionDefaultData);

    return competitionId;
  } catch (e) {
    console.log(e);
    console.log("4 code");
  }

  return null;
};

// A helper for updating each compeition doc in firbase
export const updateCompetition = async (competitionId: string, competitionData) => {
  try {
    const res = await updateDoc(
      doc(firestore, competitionCollection, competitionId),
      competitionData
    );
  } catch (e) {
    console.log(e);
    console.log(competitionData);
    console.log("5 code");
  }
};

// Add a user to a competition
export const addAUserToACompetition = async (user: ICompetitionPlayer, competitionId: string) => {
  try {
    const res = await updateDoc(doc(firestore, competitionCollection, competitionId), {
      players: arrayUnion(user)
    });
  } catch (e) {
    console.log(e);
    console.log("6 code");
  }
};

// Add a user to a competition
export const joinACompetitionByCode = async (
  joiningUserData: ICompetitionPlayer,
  competitionUid: string
) => {
  try {
    // TODO: Implement check if code exists
    // TODO: Check if player is already in the competition (added)
    // Throw error for both
    // const res = await query(
    //   collection(firestore, competitionCollection),
    //   where("uid", "==", competitionUid)
    // );
    // const querySnapshot = await getDocs(res);

    // if (querySnapshot.empty) {
    //   alert("Invalid code");
    //   return;
    // }

    // // add user to competition
    // const competition = querySnapshot.docs[0];
    // console.log(joiningUserData, competitionUid);
    // const competition = await getCompetition(competitionUid);

    await addAUserToACompetition(joiningUserData, competitionUid);
    await addCompetitionToAUser(joiningUserData.id, competitionUid);
    await addPlayerToCompetitionState(joiningUserData, competitionUid);
  } catch (e) {
    console.log(e);
    console.log("6 code");
    console.log("err in joining competition firebase");
  }
};

// Remove a user from a collection
export const deleteAUserFromACompetition = async (uid: string, competitionId: string) => {
  try {
    const res = await updateDoc(doc(firestore, competitionCollection, competitionId), {
      players: arrayRemove(uid)
    });
  } catch (e) {
    console.log(e);
    console.log("7 code");
  }
};

// FIXME: can join only if the user has the game is linked and is not already in

// FIXME: Notify server that user joined so that hes added to the array of players of that competition

export const addCompetitionToAUser = async (uid, competitionId) => {
  try {
    await updateUser(uid, {
      competitions: {
        current: arrayUnion({
          id: competitionId
        })
      }
    });
  } catch (e) {
    console.log(e);
    console.log("8 code");
  }
};

// delete competition from a user
export const removeACompetitionFromAUser = async (uid, competitionId) => {
  try {
    await updateUser(uid, {
      "competitions.all": arrayRemove(competitionId)
    });
  } catch (e) {
    console.log(e);
    console.log("9 code");
  }
};

/////////////////////////////////////////////////////

export interface CompetitionState {
  id: string;
  startsAt: number;
  game: IGame["name"];
  duration: 1 | 2 | 3;
  name: string;
  state: "waitingToStart" | "inProgress" | "finished" | "aborted";
  players: ICompetitionPlayer[];
}

export const getAllCompetitionsForServer = async (): Promise<CompetitionState[]> => {
  try {
    const res = await getDoc(doc(firestore, competitionCollection, "state"));

    const serverCompetitions: CompetitionState[] = [];

    res.data()?.toStartIds && serverCompetitions.push(...res.data()?.toStartIds);
    res.data()?.inProgressIds && serverCompetitions.push(...res.data()?.inProgressIds);

    return serverCompetitions.map(competition => ({
      ...competition,
      startsAt: competition.startsAt
    }));
  } catch (e) {
    console.log(e);
    console.log("10 code");
    return [];
  }
};

export const getAllStateCompetitions = async (state: "toStartIds" | "inProgressIds") => {
  try {
    const res = await getDoc(doc(firestore, competitionCollection, "state"));

    return res.data()?.[state] || [];
  } catch (e) {
    console.log(e);
    console.log("11 code");
    return {};
  }
};

export const addCompetitionToCompetitionStateToStart = async (competition: CompetitionState) => {
  try {
    await updateDoc(doc(firestore, competitionCollection, "state"), {
      toStartIds: arrayUnion({ ...competition })
    });

    await axios.get(`/server/competition-created?competitionId=${competition.id}`, {
      baseURL: `http://localhost:${process?.env?.PORT || 3000}`
    });
  } catch (e) {
    console.log(e);
    console.log("code 1", (e as any)?.code);
  }
};

export const addPlayerToCompetitionState = async (
  player: ICompetitionPlayer,
  competitionId: string
) => {
  try {
    const toStartCompetitions = await getAllStateCompetitions("toStartIds");
    const competitionToRemove = toStartCompetitions.find(({ id }) => id === competitionId);
    const updatedCompetition = {
      ...competitionToRemove,
      players: [...competitionToRemove.players, player]
    };

    await updateDoc(doc(firestore, competitionCollection, "state"), {
      toStartIds: arrayRemove({ ...competitionToRemove })
    });

    await updateDoc(doc(firestore, competitionCollection, "state"), {
      toStartIds: arrayUnion({ ...updatedCompetition })
    });
  } catch (e) {
    console.log(e);
    console.log("code 2", (e as any)?.code);
  }
};

export const moveCompetitionFromToStartToInProgress = async (competition: CompetitionState) => {
  try {
    const toStartCompetitions = await getAllStateCompetitions("toStartIds");
    const competitionToRemove = toStartCompetitions.find(({ id }) => id === competition.id);

    try {
      competitionToRemove &&
        (await updateDoc(doc(firestore, competitionCollection, "state"), {
          toStartIds: arrayRemove({
            ...competitionToRemove
          })
        }));
    } catch (e) {
      console.log("arrayRemove", {
        ...competitionToRemove
      });
      console.log(e);
    }

    try {
      competitionToRemove &&
        (await updateDoc(doc(firestore, competitionCollection, "state"), {
          inProgressIds: arrayUnion({
            ...competition,
            players: competitionToRemove.players,
            state: "inProgress"
          })
        }));
    } catch (e) {
      console.log("arrayUnion", {
        ...competition,
        state: "inProgress"
      });
      console.log(competition.players[0]);
      console.log(e);
    }

    try {
      await updateCompetition(competition.id, {
        state: "inProgress",
        numberOfPlayers: competition.players.length,
        players: competition.players
      });
    } catch (e) {
      console.log("update competition", {
        state: "inProgress",
        numberOfPlayers: competition.players.length,
        players: competition.players
      });
    }
  } catch (e) {
    console.log(e);
    console.log("code 3", (e as any)?.code);
  }
};

export const moveCompetitionFromInProgressToFinished = async (competition: CompetitionState) => {
  try {
    const inProgressCompetitions = await getAllStateCompetitions("inProgressIds");
    const competitionToRemove = inProgressCompetitions.find(({ id }) => id === competition.id);

    await updateDoc(doc(firestore, competitionCollection, "state"), {
      inProgressIds: arrayRemove({ ...competitionToRemove })
    });

    // FIXME: Add the rest of the data that the finalized competition needs
    await updateCompetition(competition.id, {
      state: "finished",
      isOver: true,
      players: competition.players
      // FIXME: NEEDS RANK AND FOR THE USER SAVING IN USERINDEX.TS
    });
  } catch (e) {
    console.log(e);

    console.log("code 4", (e as any)?.code);
  }
};

// FIXME: ALSO UPDATE THE REAL COMPETITIONS AND THEIR STATE
export const moveCompetitionFromToStartToFinished = async (competition: CompetitionState) => {
  try {
    await updateDoc(doc(firestore, competitionCollection, "state"), {
      toStartIds: arrayRemove({ ...competition })
    });

    await updateCompetition(competition.id, { state: "finished" });
  } catch (e) {
    console.log(e);

    console.log("code 5", (e as any)?.code);
  }
};

export const competitionAborted = async (competition: CompetitionState) => {
  try {
    console.log("called to delete");
    await updateDoc(doc(firestore, competitionCollection, "state"), {
      toStartIds: arrayRemove({ ...competition })
    });

    await deleteDoc(doc(firestore, competitionCollection, competition.id));

    for (let i = 0; i < competition.players.length; i++) {
      await updateUser(competition.players[i].id, {
        competitions: {
          current: arrayRemove({
            id: competition.id
          })
        }
      });
    }
  } catch (e) {
    console.log(e);
    console.log("code 666");
  }
};

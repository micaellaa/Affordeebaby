import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

export const removeFriend = async (friendUID) => {
  const user = authentication.currentUser;
  const userUID = user.uid;

  if (!user) return;

  const userRef = doc(firestore, "users", userUID);

  try {
    await updateDoc(userRef, {
      friendships: arrayRemove(friendUID),
    });
  } catch (error) {
    console.log("Error in removing friend", error);
  }
};

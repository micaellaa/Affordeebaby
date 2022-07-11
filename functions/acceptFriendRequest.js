import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

export const acceptFriendRequest = async (senderUID) => {
  const user = authentication.currentUser;
  const receiverUID = user.uid;

  if (!user) return;

  const receiverRef = doc(firestore, "users", receiverUID);
  const senderRef = doc(firestore, "users", senderUID);

  try {
    await updateDoc(receiverRef, {
      friendships: arrayUnion(senderUID),
    });
    await updateDoc(senderRef, {
      friendships: arrayUnion(receiverUID),
    });
    await updateDoc(receiverRef, {
      friendRequests: arrayRemove(senderUID),
    });
  } catch (error) {
    console.log("Error in accepting friend request", error);
  }
};
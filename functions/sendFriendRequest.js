import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

export const sendFriendRequest = async (receiverUID) => {
  const user = authentication.currentUser;
  const senderUID = user.uid;

  if (!user) return;

  const receiverRef = doc(firestore, "users", receiverUID);

  try {
    await updateDoc(receiverRef, {
      friendRequests: arrayUnion(senderUID),
    });
  } catch (error) {
    console.log("Error in sending friend request", error);
  }
};

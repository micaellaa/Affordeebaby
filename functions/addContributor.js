import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

export const addContributor = async (cartID, contributorID) => {
  const user = authentication.currentUser;
  const receiverUID = user.uid;

  if (!user) return;

  const cartRef = doc(firestore, "carts", cartID);

  try {
    await updateDoc(cartRef, {
      usersid: arrayUnion(contributorID),
    });
  } catch (error) {
    console.log("Error in removing contributor", error);
  }
};

// doesn't prevent dupiclate adding

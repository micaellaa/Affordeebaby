import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

export const removeContributor = async (cartID, contributorID) => {
  const user = authentication.currentUser;
  if (!user) return;

  const cartRef = doc(firestore, "carts", cartID);

  try {
    await updateDoc(cartRef, {
      usersid: arrayRemove(contributorID),
    });
  } catch (error) {
    console.log("Error in removing contributor", error);
  }
};

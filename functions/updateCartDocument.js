import { authentication } from "../firebase/firebase-config";
import "firebase/firestore";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

export const updateCartDocument = async (cartID, productID) => {
  const user = authentication.currentUser;
  const userUID = user.uid;

  console.log("updateCartDocument with: ", userUID);
  const cartsRef = doc(firestore, "carts", cartID);
  try {
    await updateDoc(cartsRef, {
      productsID: arrayUnion({ productID, userUID }),
    });
  } catch (error) {
    console.log("Error in creating order", error);
  }
};

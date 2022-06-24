/*import { firestore } from "./firebase/firebase-config";
import { authentication } from "./firebase/firebase-config";
import {
  initializeFirestore,
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

//authentication for profile
const user = authentication.currentUser;
const userUID = user.uid;

const docRef = doc(firestore, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

export const currentFirstName = docSnap.get(firstName);
export const currentUserName = docSnap.get(username);
export const currentMobileNum = docSnap.get(username);*/

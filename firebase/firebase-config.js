// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABtSckXQzlwy9QCkqohh46hCWg-b7RT0E",
  authDomain: "fir-auth-11675.firebaseapp.com",
  projectId: "fir-auth-11675",
  storageBucket: "fir-auth-11675.appspot.com",
  messagingSenderId: "566724776790",
  appId: "1:566724776790:web:717c358000d715f0fdbcf7"
};

// Initialize Firebase
let app;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  // Initialize other firebase products here
}

const db = getFirestore(app);

/*
async function getUsers(db) {
  const 
}
*/

// SDKs
export const authentication = getAuth(app);
export 


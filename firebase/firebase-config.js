// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore'
//import { getFirestore, collection, getDocs } from "firebase/auth";
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

initializeFirestore(app, {
  ignoreUndefinedProperties: true
});

// SDKs
export const authentication = getAuth(app);
const firestore = getFirestore(app);
export const createUserDocument = async (user, additionalData) => {
if (!user) return;
console.log('is user');
const userRef =  doc(firestore, 'users', user.uid);
      //const snapshot = await getDoc(userRef);

  //if (user) {
const email = user.email;
const firstName = additionalData[0];
const mobileNumber = additionalData[1];
const username = additionalData[2];

console.log(user.uid);
console.log(firstName);
      
try {
        /*userRef.set({
          username,
          email,
          firstName,
          mobileNumber,
          createdAt: new Date()
        
        })*/
    console.log('try entered with: ' + user.uid);
    await setDoc(doc(firestore, 'users', user.uid), {
      email: email,
      firstName: firstName,
      mobileNum: mobileNumber,
      username: username
    })
    console.log('user data added');
  } catch(error) {
    console.log('Error in creating user', error);
  }

}



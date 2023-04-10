// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export { firebaseConfig, auth, db, storage};

exports.processPayment = functions
  // Make the secret available to this function
  .runWith({ secrets: [
    "REACT_APP_FIREBASE_APIKEY", 
    "REACT_APP_FIREBASE_AUTHDOMAIN",
    "REACT_APP_FIREBASE_PROJECTID",
    "REACT_APP_FIREBASE_STORAGEBUCKET",
    "REACT_APP_FIREBASE_MESSAGINGSENDERID",
    "REACT_APP_FIREBASE_APPID",
    "REACT_APP_FIREBASE_MEASUREMENTID",
    "REACT_APP_FIREBASE_NEWSAPIKEY"] })
  .onCall((data, context) => {
    const myBillingService = initializeBillingService(
      // reference the secret value
      process.env.SECRET_NAME
    );
    // Process the payment
  });
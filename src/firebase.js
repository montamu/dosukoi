// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVStSdvUT1rrhlGZowYvef4-wRcrxw6V8",
  authDomain: "dosukoi-16815.firebaseapp.com",
  projectId: "dosukoi-16815",
  storageBucket: "dosukoi-16815.appspot.com",
  messagingSenderId: "110630163115",
  appId: "1:110630163115:web:a8fbccde8830f644f39dee",
  measurementId: "G-Q94NR7ZCRK"
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

const functions = getFunctions(app, "asia-northeast2");

export { firebaseConfig, auth, db, storage, functions };
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, /* connectAuthEmulator */ } from "firebase/auth";
import { getFirestore, /* connectFirestoreEmulator */ } from "firebase/firestore";
import { getFunctions, /* connectFunctionsEmulator */ } from "firebase/functions";
import { getStorage, /* connectStorageEmulator */ } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const auth = getAuth(app);
// エミュレーターを使うときは、この下の１行をアンコメントする
// connectAuthEmulator(auth, "http://localhost:9099");

const db = getFirestore(app);
// エミュレーターを使うときは、この下の１行をアンコメントする
// connectFirestoreEmulator(db, 'localhost', 8000);

const storage = getStorage(app);
// エミュレーターを使うときは、この下の１行をアンコメントする
// connectStorageEmulator(storage, "localhost", 9199);

const functions = getFunctions(app, "asia-northeast2");
// エミュレーターを使うときは、この下の１行をアンコメントする
// connectFunctionsEmulator(functions, "localhost", 5001);

export { firebaseConfig, auth, db, storage, functions };
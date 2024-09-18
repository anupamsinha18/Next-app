import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyASVDuaW781qYoPY-DhrNL3izJpItSPU7M",
  authDomain: "next-project-b0a7a.firebaseapp.com",
  databaseURL: "https://next-project-b0a7a-default-rtdb.firebaseio.com",
  projectId: "next-project-b0a7a",
  storageBucket: "next-project-b0a7a.appspot.com",
  messagingSenderId: "892798472109",
  appId: "1:892798472109:web:ad5021a5168e16264d5b24",
  measurementId: "G-YE6GS2MKNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, analytics };
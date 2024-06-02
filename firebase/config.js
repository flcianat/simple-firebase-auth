import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlZZBsXpcZYVKYJRLi9SKVXMzt126pvg8",
  // authDomain: "fir-auth-dd4df.firebaseapp.com",
  authDomain: "localhost",
  projectId: "fir-auth-dd4df",
  storageBucket: "fir-auth-dd4df.appspot.com",
  messagingSenderId: "269666752219",
  appId: "1:269666752219:web:5e2f96353713d618ce9efe",
  measurementId: "G-9GTQJHT38R",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = getFirestore();
connectFirestoreEmulator(app, "127.0.0.1", 8080);
// const auth = getAuth(app);

export default app;

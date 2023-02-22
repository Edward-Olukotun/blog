import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBwaJ8b7ux3hEdEvYhbuDTEiiAvxwRASKg",
  authDomain: "blogfaculty.firebaseapp.com",
  projectId: "blogfaculty",
  storageBucket: "blogfaculty.appspot.com",
  messagingSenderId: "925844270138",
  appId: "1:925844270138:web:702027cce728ef2b4a9903",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

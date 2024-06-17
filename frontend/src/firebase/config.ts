// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2x1wOBLkEB6QXkOKSyvOcGjKK5oE5bgY",
  authDomain: "trumio-interiit-12fb0.firebaseapp.com",
  projectId: "trumio-interiit-12fb0",
  storageBucket: "trumio-interiit-12fb0.appspot.com",
  messagingSenderId: "295447223636",
  appId: "1:295447223636:web:2441bfc3b2d28c4fee7cc1",
  measurementId: "G-BLHQ4VP79J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const fstore = getFirestore(app);
connectFirestoreEmulator(fstore, '127.0.0.1', 8080)

export const firestore = {
  master: (projectId: string, userId: string) => collection(fstore, 'master', projectId, userId),
  updates: (projectId: string) => collection(fstore, 'updates', 'projects', projectId),
}

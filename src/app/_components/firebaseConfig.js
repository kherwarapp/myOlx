// For Firebase JS SDK v7.20.0 and later, measurementId is o
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.APIK,
  authDomain: "olx-udaipur.firebaseapp.com",
  projectId: "olx-udaipur",
  storageBucket: "olx-udaipur.firebasestorage.app",
  messagingSenderId: "82745367359",
  appId: "1:82745367359:web:e79ee6897f8fe64546518a",
  measurementId: "G-QFKX30DQQB"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
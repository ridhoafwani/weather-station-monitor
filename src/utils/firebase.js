// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "-MJ5WaY-ca5iySsR4c",
  authDomain: "mini-wheater-station.firebaseapp.com",
  databaseURL: "https://mini-wheater-station-default-rtdb.firebaseio.com",
  projectId: "mini-wheater-station",
  storageBucket: "mini-wheater-station.appspot.com",
  messagingSenderId: "64722236595",
  appId: "1:64722236595:web:51c0c636cb265a023becc6",
  measurementId: "G-3YK39K7VZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

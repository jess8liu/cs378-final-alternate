// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAF99o1FynJMhIJUwRdm1yOuMpZF1ABvuE",
  authDomain: "cs378-final.firebaseapp.com",
  projectId: "cs378-final",
  storageBucket: "cs378-final.appspot.com",
  messagingSenderId: "113361070597",
  appId: "1:113361070597:web:128ddcc2e4fe2cffb28a6c",
  measurementId: "G-V464939ZMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

export const storage = getStorage(app);
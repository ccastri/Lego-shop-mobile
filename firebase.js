// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADXHVDGmaWKPg2QFcDKalDgNuUdWx-uUs",
  authDomain: "lego-app-fb912.firebaseapp.com",
  projectId: "lego-app-fb912",
  storageBucket: "lego-app-fb912.appspot.com",
  messagingSenderId: "693208400867",
  appId: "1:693208400867:web:0f0f6e329f0cf50ce516d6"
};

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const storage = getStorage();


export { app };


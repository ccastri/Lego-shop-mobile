// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';
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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// const storage = getStorage();
// const analytics = getAnalytics(app);

export { app }

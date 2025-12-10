import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQfs806B5U4QyKOTF8V-6_KKIcLyrqP-Q",
  authDomain: "autosolutions-e0198.firebaseapp.com",
  projectId: "autosolutions-e0198",
  storageBucket: "autosolutions-e0198.firebasestorage.app",
  messagingSenderId: "663187818816",
  appId: "1:663187818816:web:4c0fcc5ebcb4ab57ae12a5",
  measurementId: "G-HLC2EY3RVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pranerjamalpur-mern-blog.firebaseapp.com",
  projectId: "pranerjamalpur-mern-blog",
  storageBucket: "pranerjamalpur-mern-blog.appspot.com",
  messagingSenderId: "1074317327003",
  appId: "1:1074317327003:web:2c4155b227da64b07e643e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
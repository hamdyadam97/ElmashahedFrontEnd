// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJfAKivfi73PxIU3-dd_Y5mldAQTfxwAw",
  authDomain: "nawahi-chat.firebaseapp.com",
  projectId: "nawahi-chat",
  storageBucket: "nawahi-chat.firebasestorage.app",
  messagingSenderId: "978069279791",
  appId: "1:978069279791:web:5b3ef63baf784330b062da",
  measurementId: "G-4SWDRVCFVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
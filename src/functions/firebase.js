// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqgjJPhbzW8kk5zB56Es_4kEn__YOUGjw",
  authDomain: "elbrit-rewards-v8luu.firebaseapp.com",
  projectId: "elbrit-rewards-v8luu",
  storageBucket: "elbrit-rewards-v8luu.appspot.com",
  messagingSenderId: "645866888477",
  appId: "1:645866888477:web:ca482f74647fa6e80bd5f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };

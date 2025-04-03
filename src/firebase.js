// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCr6kdvrnAnZdhNLLw0_lLU9dV7i9-Xgcg",
  authDomain: "ai-educational-video-platform.firebaseapp.com",
  databaseURL: "https://ai-educational-video-platform-default-rtdb.firebaseio.com",
  projectId: "ai-educational-video-platform",
  storageBucket: "ai-educational-video-platform.firebasestorage.app",
  messagingSenderId: "567343656924",
  appId: "1:567343656924:web:4135e0e5751eb4d57be919",
  databaseURL:"https://ai-educational-video-platform-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {getAuth} from  "firebase/auth"

// TODO: Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLP5KSRgXsd3QnXLIiF4PsW8VOJspQI3E",
  authDomain: "worldcountry-f3a38.firebaseapp.com",
  projectId: "worldcountry-f3a38",
  storageBucket: "worldcountry-f3a38.appspot.com",
  messagingSenderId: "707871730218",
  appId: "1:707871730218:web:9535ad7af628f21af2f153"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Services (database, auth, etc)
const db = getFirestore(app);
const auth = getAuth(app)
export {db,auth}
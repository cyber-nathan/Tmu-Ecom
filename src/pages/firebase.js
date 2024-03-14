import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD36AxBMfOqWCjjZ7bLFZ02sRaTJPGXpxM",
    authDomain: "cps630project-705d1.firebaseapp.com",
    projectId: "cps630project-705d1",
    storageBucket: "cps630project-705d1.appspot.com",
    messagingSenderId: "534865921953",
    appId: "1:534865921953:web:ea8b87ec1ce743828aede0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
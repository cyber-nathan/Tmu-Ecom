import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
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
export const auth = getAuth(app);
export default app;
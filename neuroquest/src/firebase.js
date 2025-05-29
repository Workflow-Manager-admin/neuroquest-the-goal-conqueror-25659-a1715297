// Firebase client config entry point
// PUBLIC_INTERFACE
import { initializeApp } from "firebase/app";

// Fill these values with real Firebase config for deployment
const firebaseConfig = {
  apiKey: "FAKE_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000abcdef"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

import { initializeApp } from 'firebase/app';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_firebaseConfig_apiKey,
  authDomain: process.env.NEXT_PUBLIC_firebaseConfig_authDomain,
  projectId: process.env.NEXT_PUBLIC_firebaseConfig_projectId,
  storageBucket: process.env.NEXT_PUBLIC_firebaseConfig_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_firebaseConfig_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_firebaseConfig_appId,
  measurementId: process.env.NEXT_PUBLIC_firebaseConfig_measurementId
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
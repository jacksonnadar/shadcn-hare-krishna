import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyATpnhpQkzLAWiqPsi46lnHSRDCdmMsmbU',
  authDomain: 'hare-krishna-920ad.firebaseapp.com',
  projectId: 'hare-krishna-920ad',
  storageBucket: 'hare-krishna-920ad.appspot.com',
  messagingSenderId: '257263028924',
  appId: '1:257263028924:web:98521011ee3393d6e1deb9',
  measurementId: 'G-GGQVRH5Y3V',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

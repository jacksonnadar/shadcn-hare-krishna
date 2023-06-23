import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    return await auth.signOut();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

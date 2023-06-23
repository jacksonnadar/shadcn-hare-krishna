import {
  Timestamp,
  Unsubscribe,
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';

export interface ContentFileFirestore {
  jsonFilePath: string;
  excelFilePath: string;
  fileAddedBy: string;
  createdAt: Timestamp;
  id: string;
}

export const addContentFile = async ([jsonFilePath, excelFilePath]: [
  string,
  string
]) => {
  try {
    const fileAddedBy =
      auth.currentUser?.displayName ?? auth.currentUser?.email;

    const collectionRef = collection(db, 'contentFiles');
    const docRef = await addDoc(collectionRef, {
      jsonFilePath,
      excelFilePath,
      fileAddedBy,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (err) {
    throw err;
  }
};

export const getFileDataStream = (
  cb: (data: ContentFileFirestore[]) => void
) => {
  query(collection(db, 'contentFiles'), orderBy('createdAt', 'desc'), limit(1));

  return onSnapshot(collection(db, 'contentFiles'), (doc) => {
    cb(
      doc.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as unknown as ContentFileFirestore[]
    );
  });
};

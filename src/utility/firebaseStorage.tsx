import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';
import { addContentFile } from './firestore';
import { DataContent } from '../App';

// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });

export const uploadMasterFileToFirebaseStorage = async (
  json: string,
  file: File,
  fileName: string
) => {
  try {
    const storageRef = ref(storage, '/content/json/' + fileName + '.json');
    const blob = new Blob([json], { type: 'application/json' });
    const jsonFileResponse = await uploadBytes(storageRef, blob);
    console.log(jsonFileResponse);
    const storageRef2 = ref(
      storage,
      '/content/xlsx/' + fileName + '.' + file.name.split('.')[1]
    );
    const excelFileResponse = await uploadBytes(storageRef2, file);
    console.log(excelFileResponse);
    await addContentFile([
      jsonFileResponse.metadata.fullPath,
      excelFileResponse.metadata.fullPath,
    ]);
    return [jsonFileResponse, excelFileResponse];
  } catch (e) {
    console.log(e);
  }
};

export const getFileFromFirebaseStorage = async (filePath: string) => {
  try {
    console.log(filePath);

    const storageRef = ref(storage, filePath);
    const url = await getDownloadURL(storageRef);
    console.log(url);

    const json = (await fetch(url).then((res) => res.json())) as DataContent;
    console.log(json);

    return json;
  } catch (err) {
    console.log(err);
  }
};

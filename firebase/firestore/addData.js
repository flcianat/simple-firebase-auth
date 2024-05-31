import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { result: docRef.id, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

export default addData;

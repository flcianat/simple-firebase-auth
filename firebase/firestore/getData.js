import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

export default async function getAllData(collectionName) {
  const colRef = collection(db, collectionName);

  let result = [];
  let error = null;

  try {
    const snapshot = await getDocs(colRef);
    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore();

export default async function getAllData(collectionName, userId) {
  const colRef = collection(db, collectionName);

  // Create a query to filter tasks by userId
  const q = query(colRef, where("userId", "==", userId));

  let result = [];
  let error = null;

  try {
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

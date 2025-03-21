import { db } from "../../firebaseConfig";
import { doc, addDoc, setDoc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

export const saveTextData = async (collectionName:string, text:string) => {
    try {
      await addDoc(collection(db, collectionName), {
        content:text,
        createdAt: new Date(),
      });
      console.log("Content saved!");
    } catch (error) {
      console.error("Oh no :_(", error);
    }
  };

export const fetchTextData = async (collectionName:string) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let content;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        content = doc.data().content
    });
    return content;
};

export const getWholeCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
};

export const getNamedDocument = async <T>(collectionName: string, id: string): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

export const setNamedDocument = async (collectionName: string, id: string, data: object) =>{
  try {
    await setDoc(doc(db, collectionName, id), data);  // Creates or overwrites
    console.log("Document saved with custom ID:", id);
  } catch (error) {
    console.error("Error saving document:", error);
  }
}

export const addDocument = async (collectionName: string, data: object) => {
  try {
    await addDoc(collection(db, collectionName), data);
    console.log("Document Added!");
  } catch (error) {
    console.error("Problem adding document", error);
  }
}

export const removeDocument = async (collectionName:string, id:string) => {
  try{
    await deleteDoc(doc(db, collectionName, id));
    console.log("Removed document with id: ", id);
  }catch(error){
    console.log("Error deleting document with id: ", id);
  }
}
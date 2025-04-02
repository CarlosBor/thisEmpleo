import { db } from "../../firebaseConfig";
import { doc, addDoc, setDoc, getDoc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const collections = ["searchQueries", "storedOffers", "sentOffers", "expiredOffers"];

export const saveTextData = async (collectionName:string, text:string) => {
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
    try {
      await addDoc(collection(db, `users/${user.uid}/${collectionName}`), {
        content:text,
        createdAt: new Date(),
      });
      console.log("Content saved!");
    } catch (error) {
      console.error("Error when saving", error);
    }
  };

export const fetchTextData = async (collectionName:string) => {
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/${collectionName}`));
    let content;
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        content = doc.data().content
    });
    return content;
};

export const getWholeCollection = async (collectionName: string) => {
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
  try {
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/${collectionName}`));
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
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error("No user is logged in. Cannot fetch document.");
  }
  try {
    const docRef = doc(db, `users/${user.uid}/${collectionName}`, id);
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
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
  try {
    await setDoc(doc(db, `users/${user.uid}/${collectionName}`, id), data);  // Creates or overwrites
    console.log("Document saved with custom ID:", id);
  } catch (error) {
    console.error("Error saving document:", error);
  }
}

export const addDocument = async (collectionName: string, data: object) => {
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
  try {
    await addDoc(collection(db, `users/${user.uid}/${collectionName}`), data);
    console.log("Document Added!");
  } catch (error) {
    console.error("Problem adding document", error);
  }
}

export const removeDocument = async (collectionName:string, id:string) => {
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
  try{
    await deleteDoc(doc(db, `users/${user.uid}/${collectionName}`, id));
    console.log("Removed document with id: ", id);
  }catch(error){
    console.log(error);
  }
}

export async function moveDocument(oldCollection:string, newCollection:string, id:string) {
  const user = getAuth().currentUser;
  if (user===null){
    console.log("No user logged");
    return
  }
  const oldDocRef = doc(db, `users/${user.uid}/${oldCollection}`, id);
  const newDocRef = doc(db, `users/${user.uid}/${newCollection}`, id);
  try {
    const docSnap = await getDoc(oldDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(newDocRef, data);
      await deleteDoc(oldDocRef);
      console.log(`Document moved from ${oldCollection} to ${newCollection}`);
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.error("Error moving document: ", error);
  }
}
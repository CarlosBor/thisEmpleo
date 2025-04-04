// @ts-nocheck
import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import style from './SnippetStorage.module.css';
import { SnippetStorageProps } from "../types/interfaces";

const SnippetStorage = (props:SnippetStorageProps) => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippetId, setSelectedSnippetId] = useState(null);
  const [newSnippet, setNewSnippet] = useState("");
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const MAX_SNIPPETS = 5;

  useEffect(() => {
    if (user) {
      fetchSnippets();
    }
  }, [user]);

  const fetchSnippets = async () => {
    if (!user) return;
    const querySnapshot = await getDocs(collection(db, `users/${user.uid}/snippets`));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSnippets(data);
  };

  const saveSnippet = async () => {
    if (!user) {
      alert("You must be logged in to save snippets.");
      return;
    }
    if (snippets.length >= MAX_SNIPPETS) {
      alert(`You can only store up to ${MAX_SNIPPETS} snippets.`);
      return;
    }
    if(newSnippet==""){
      alert("Write content before saving");
      return;
    }
    try {
      await addDoc(collection(db, `users/${user.uid}/snippets`), { content: newSnippet, createdAt: new Date() });
      setNewSnippet("");
      fetchSnippets();
    } catch (error) {
      console.error("Error saving snippet:", error);
    }
  };

  const deleteSnippet = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/snippets`, id));
      fetchSnippets();
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  };

  const snippetButtonHandler = (snippet) =>{
    setNewSnippet(snippet.content);
    setSelectedSnippetId(snippet.id);
  }

  const overWriteSnippet = async () => {
    if (!user || !selectedSnippetId) {
      alert("Select a snippet to overwrite.");
      return;
    }else if(newSnippet==""){
      alert("Write content before saving");
      return;
    }
    try {
      const snippetRef = doc(db, `users/${user.uid}/snippets`, selectedSnippetId);
      await updateDoc(snippetRef, { content: newSnippet, updatedAt: new Date() });
      fetchSnippets();
    } catch (error) {
      console.error("Error updating snippet:", error);
    }
  };
  

  return (
    <div className={style.backDrop} onClick={()=> props.toggleSnippetStorage()}>
      <div className={style.snippetWrapper}>
        <h2>Saved Snippets</h2>
        <div className={style.snippetStorage} onClick={(e) => e.stopPropagation()}>
            {snippets.map(snippet => (
              <span key={snippet.id}>
                <button
                  className={`${style.snippetSelectorButton} ${snippet.id === selectedSnippetId ? style.activeSnippet : ''}`}
                  onClick={()=> snippetButtonHandler(snippet)}>
                  {snippet.content.slice(0,20)}
                </button>
              </span>
            ))}
          <textarea className={style.snippetText} value={newSnippet} onChange={(e) => setNewSnippet(e.target.value)} placeholder="Enter your snippet here..." />  
          <div className={style.snippetControls}>
            <button onClick={saveSnippet} disabled={snippets.length >= MAX_SNIPPETS}>Save Snippet</button>
            <button onClick={() => overWriteSnippet(selectedSnippetId)}>Overwrite Snippet</button>
            <button onClick={() => navigator.clipboard.writeText(snippet.content)}>Copy Content</button>
            <button onClick={() => deleteSnippet(selectedSnippetId)}>Delete Snippet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetStorage;

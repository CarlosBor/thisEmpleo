import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const SnippetStorage = () => {
  const [snippets, setSnippets] = useState([]);
  const [newSnippet, setNewSnippet] = useState("");
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const MAX_SNIPPETS = 3;

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
      alert("You can only store up to 3 snippets.");
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

  return (
    <div>
      <h2>Saved Snippets</h2>
      <textarea value={newSnippet} onChange={(e) => setNewSnippet(e.target.value)} placeholder="Enter your snippet here..." />
      <button onClick={saveSnippet} disabled={snippets.length >= MAX_SNIPPETS}>Save Snippet</button>
      <ul>
        {snippets.map(snippet => (
          <li key={snippet.id}>
            <textarea readOnly value={snippet.content} />
            <button onClick={() => navigator.clipboard.writeText(snippet.content)}>Copy</button>
            <button onClick={() => deleteSnippet(snippet.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetStorage;

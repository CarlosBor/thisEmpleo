import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";
import style from './CVStorage.module.css';

const CVStorage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) fetchUserFiles();
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) {
      alert("Please select a file and log in first.");
      return;
    }

    const storage = getStorage();
    const fileRef = ref(storage, `users/${user.uid}/${file.name}`);
    setUploading(true);

    try {
      await uploadBytes(fileRef, file);
      alert("File uploaded successfully!");
      fetchUserFiles();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const fetchUserFiles = async () => {
    if (!user) return;

    const storage = getStorage();
    const userFolderRef = ref(storage, `users/${user.uid}/`);

    try {
      const result = await listAll(userFolderRef);
      const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
      setFiles(urls);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };


  const removeFile = async (fileName: string) => {
    if (!user) return;

    const storage = getStorage();
    const fileRef = ref(storage, `users/${user.uid}/${fileName}`);

    try {
      await deleteObject(fileRef);
      alert("File deleted successfully!");
      fetchUserFiles();  // Re-fetch the file list after deletion
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting file.");
    }
  };

  return (
    <div>
      <h2>CV Storage</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h3>Uploaded:</h3>
        <ul>
          {files.map((url, index) => {
            const decodedFilename = decodeURIComponent(url.split("/").pop()?.split("?")[0] || "Download File");
            const fileName = decodedFilename.split("/")[decodedFilename.split("/").length-1];
            return (
              <li key={index} className={style.listItems}>
                <a href={url} className={style.downloadLink} target="_blank" rel="noopener noreferrer">
                  {fileName || "No uploaded CVs"}
                </a>
                <span className={style.removeButton} onClick={() => removeFile(fileName)}></span>
              </li>
            );
          })}
        </ul>
    </div>
  );
};

export default CVStorage;
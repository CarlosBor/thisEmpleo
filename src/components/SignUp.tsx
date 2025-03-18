import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { signOutOfGoogle, SignUpWithGoogle } from "../api/fireBaseLogin";
import { setNamedDocument, getNamedDocument } from "../api/firebaseDb";
import { TextoDocument } from "../types/interfaces";

const Signup = () => {
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

  const [infoGuardar, setInfoGuardar] = useState("");
  const [storedText, setStoredText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setInfoGuardar(value);
};
  const testStorage = () => {
    setNamedDocument("textos", infoGuardar, {texto:"Wowie"});
  }

  const testRetrieval = async () => {
    let contenido = await getNamedDocument<TextoDocument>("textos", infoGuardar)
    if(contenido!=null){
      setStoredText(contenido.texto);
    }
  }

  return (
    <>
        <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            style={{ backgroundColor: "#ea4335" }}
            onClick={SignUpWithGoogle}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                <path
                    d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                />
                </svg>
            &nbsp; Google
        </button>
        <>
            <p>{user ? `Logged in as: ${user.email}` : "Not logged in"}</p>
            <button onClick={signOutOfGoogle}>Logout Button</button>
        </>
        <button onClick={testStorage}>Testing storage</button>
        <input type="text" name="storage" id="storage" value={infoGuardar} onChange = {handleChange}/>
        <button onClick={testRetrieval}>Testing retrieval</button>
        <p>El texto guardado es: {storedText}</p>
        <p>El texto a guardar es: {infoGuardar}</p>
    </>
  );
};

export default Signup;
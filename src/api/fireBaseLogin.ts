import { getAuth, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const signOutOfGoogle = async () => {
    const auth = getAuth();
    if (!auth.currentUser) {
        console.log("No user is currently signed in.");
        return;
    }
    try {
        await signOut(auth);
        console.log("Signed out successfully");
    } catch (error) {
        console.error("Sign out error:", error);
    }
};

export const SignUpWithGoogle = async () => {
  try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential){
          console.error("Error in user Credentials")
          return
      }
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
          console.log("Error found", error);
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log("Credential error", credential);
      }
};
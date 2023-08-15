import { Auth, GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { authFirebase } from "../auth";


async function signInWithGmail() {

    try {
        const auth: Auth = authFirebase;
        const googleProvider = new GoogleAuthProvider();
        const result: UserCredential = await signInWithPopup(auth, googleProvider);
        return result;
    } catch (error: any) {
        console.error("Error signing in with Google:", error);
        return null;
    }
}

export default signInWithGmail;

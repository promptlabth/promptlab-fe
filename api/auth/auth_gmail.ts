import { Auth, GoogleAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { authFirebase } from "../auth";

interface GoogleUserCredential extends UserCredential {
    accessToken: string | undefined
}

async function signInWithGmail(): Promise<GoogleUserCredential | null> {

    try {
        const auth: Auth = authFirebase;
        const googleProvider = new GoogleAuthProvider();
        googleProvider.addScope("email")
        const result: UserCredential = await signInWithPopup(auth, googleProvider);
        const accessToken: string | undefined = GoogleAuthProvider.credentialFromResult(result)?.accessToken
        return { ...result, accessToken };
    } catch (error: any) {
        console.error("Error signing in with Google:", error);
        return null;
    }
}

export default signInWithGmail;

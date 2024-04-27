import {
  Auth,
  FacebookAuthProvider,
  UserCredential,
  signInWithPopup,
} from "firebase/auth";
import { authFirebase } from "../AuthFirebase";
interface FacebookUserCredential extends UserCredential {
  accessToken: string | undefined;
}

async function signInWithFacebook(): Promise<FacebookUserCredential | null> {
  try {
    const auth: Auth = authFirebase;
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    const result: UserCredential = await signInWithPopup(auth, provider);
    const accessToken: string | undefined =
      FacebookAuthProvider.credentialFromResult(result)?.accessToken;
    console.log("Result is", result);
    return { ...result, accessToken };
  } catch (error: any) {
    console.error("Error signing in with Facebook:", error);
    return null;
  }
}

export default signInWithFacebook;

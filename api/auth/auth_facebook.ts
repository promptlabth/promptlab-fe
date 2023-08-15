import { Auth, FacebookAuthProvider, UserCredential, signInWithPopup } from "firebase/auth";
import { authFirebase } from "../auth";

// const auth: Auth = getAuth(appFirebase);

// getRedirectResult(auth)
//   .then((result: UserCredential | null) => {
//     if (result) {
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential: OAuthCredential | null = FacebookAuthProvider.credentialFromResult(result);
//       if (credential) {
//         const token: string | undefined = credential.accessToken;

//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       }
//     }
//   })
//   .catch((error: any) => {
//     // Handle Errors here.
//     const errorCode: string = error.code;
//     const errorMessage: string = error.message;
//     // The email of the user's account used.
//     const email: string | null = error.customData.email;
//     // AuthCredential type that was used.
//     const credential: OAuthCredential | null = FacebookAuthProvider.credentialFromError(error);
//     // ...
//   });

async function signInWithFacebook(): Promise<UserCredential | null> {
    try {
      const auth: Auth = authFirebase;
      const provider = new FacebookAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      return result;
    } catch (error: any) {
      console.error("Error signing in with Facebook:", error);
      return null;
    }
  }

  export default signInWithFacebook;


import { UserCredential } from "firebase/auth";

export interface SignInUserCredential extends UserCredential {
  accessToken: string | undefined;
}

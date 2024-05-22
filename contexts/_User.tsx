import { SignInUserCredential } from "@/models/types/dto/auth/userCredential.type";
import { LoginResponse } from "@/models/types/dto/responses/loginResponse.type";
import { LoginUser } from "@/models/types/loginUser.type";
import { apiUserLogin } from "@/services/api/UserAPI";
import { authFirebase } from "@/services/firebase/AuthFirebase";
import signInWithFacebook from "@/services/firebase/auth/AuthFacebook";
import signInWithGmail from "@/services/firebase/auth/AuthGmail";
import { getAccessToken } from "@/services/firebase/auth/GetTokenAuth";
import { delay } from "@/utils/time";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface UseUserInterface {
  user: LoginUser | null;
  handleLogin: (typeLogin: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  getUserData: () => Promise<void>;
}

export function UseUser(): UseUserInterface {
  const [user, setUser] = useState<LoginUser>();
  const router = useRouter();

  const setUserData = async (loginResult : LoginResponse) => {
    let userData: LoginUser;
    if (!loginResult?.plan) {
       userData = { ...loginResult?.user,}
    } else {
       userData = {
          ...loginResult?.user,
          plan_id: loginResult?.plan.product.id,
          planType: loginResult?.plan.product.planType,
          maxMessages: loginResult?.plan.product.maxMessages,
          start_date: loginResult?.plan.start_date,
          end_date: loginResult?.plan.end_date,
       }
    }
    setUser(userData)
 }

  const userLogin = async (token: string, platform: string, platformToken: string) => {
    try {
       const loginResult = await apiUserLogin(token, platform, platformToken);
       if (loginResult) {
          setUserData(loginResult)
          return
       }
       console.error("Login failed, try again!")
       return
    } catch (error) {
       console.error("Error login:", error);
    }
 }

 
  const handleLogin = async (typeLogin: string) => {
    try {
      let result: SignInUserCredential | null;
      switch (typeLogin) {
        case "facebook":
          result = await signInWithFacebook();
          localStorage.setItem("typeLogin", "facebook");
          break;
        case "gmail":
          result = await signInWithGmail();
          localStorage.setItem("typeLogin", "gmail");
          break;
        default:
          console.error("type login is undefined");
          return;
      }
      // Proceed if the sign-in is successful
      if (result) {
        // Retrieve the token from the user data
        const accessToken = await result.user.getIdToken();
        // const refreshToken = result.user.refreshToken;
        const platformToken = result.accessToken ?? "";

        userLogin(accessToken, typeLogin, platformToken)

        await delay(200);
        router.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    signOut(authFirebase).then(() => {
      localStorage.removeItem("at");
      localStorage.removeItem("rt");
      localStorage.removeItem("typeLogin");
      localStorage.removeItem("pat");
    });
    await router.push("/");
    router.reload();
  };

  const getUserData = async () => {
    try {
       const typeLogin = localStorage.getItem("typeLogin") ?? '';
       const accessToken = await getAccessToken();
       const platformToken = localStorage.getItem("pat") ?? '';
       userLogin(accessToken, typeLogin, platformToken)
    } catch (error) {
       console.error("Error get user data:", error);
    }
 }

 useEffect(()=>{
  getUserData()
 },[])
  return {
    user: user ? user : null, 
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getUserData: getUserData
  };
}

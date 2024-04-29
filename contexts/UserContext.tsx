
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models/types/loginUser.type';
import { apiUserLogin } from '@/services/api/UserAPI';
import { useRouter } from 'next/router';
import signInWithFacebook from '@/services/firebase/auth/AuthFacebook';
import signInWithGmail from '@/services/firebase/auth/AuthGmail';
import { authFirebase } from '@/services/firebase/AuthFirebase';
import { signOut } from 'firebase/auth';
import { getAccessToken } from '@/services/firebase/auth/GetTokenAuth';
import { apiGetGeneratedMessageCount } from '@/services/api/MessageAPI';
import { SignInUserCredential } from '@/models/types/dto/auth/userCredential.type';
import { LoginResponse } from '@/models/types/dto/responses/loginResponse.type';

interface UserContextInterface {
   user: LoginUser | null;
   generatedMessageCount: number;
   handleLogin: (typeLogin: string) => Promise<void>;
   handleLogout: () => Promise<void>;
   updateGeneratedMessageCount: () => Promise<void>;
}

// Create user context
const UserContext = createContext<UserContextInterface | undefined>(undefined);

interface Props {
   children: ReactNode;
}

export function useUserContext() {
   return useContext(UserContext)
}

const delay = (ms : number) => new Promise(
   resolve => setTimeout(resolve, ms)
);

export function UserContextProvider({ children }: Props) {
   const [User, setUser] = useState<LoginUser>();
   const router = useRouter()
   const [generatedMessageCount, setGeneratedMessageCount] = useState<number>(0);

   const updateGeneratedMessageCount = async () => {
      const remainingMessage = await apiGetGeneratedMessageCount();
      setGeneratedMessageCount(remainingMessage ? remainingMessage : 0);
   }

   const setUserData = async (loginResult : LoginResponse) => {
      let userData: LoginUser;
      const messageCount = await apiGetGeneratedMessageCount();
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
      setGeneratedMessageCount(messageCount ? messageCount : 0);
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
            console.error("type login is undefined")
            return;
      }

      // Proceed if the sign-in is successful
      if (result) {
         // Retrieve the token from the user data
         const accessToken = await result.user.getIdToken()
         const refreshToken = result.user.refreshToken
         const platformToken = result.accessToken ?? '';

         localStorage.setItem("at", accessToken);
         localStorage.setItem("rt", refreshToken);
         localStorage.setItem("pat", platformToken);

         userLogin(accessToken, typeLogin, platformToken)
         
         await delay(200);
         router.reload()
      }

   }

   const handleLogout = async () => {
      signOut(authFirebase).then(() => {
         localStorage.removeItem("at");
         localStorage.removeItem("rt");
         localStorage.removeItem("typeLogin");
         localStorage.removeItem("pat");
      })
      await router.push("/")
      router.reload()
   }


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


   useEffect(() => {
      getUserData();
   }, []);

   const contextValue: UserContextInterface = {
      user: User || null,
      generatedMessageCount: generatedMessageCount,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      updateGeneratedMessageCount: updateGeneratedMessageCount,
   }
   return (
      <UserContext.Provider value={contextValue}> {children} </UserContext.Provider>
   )
}
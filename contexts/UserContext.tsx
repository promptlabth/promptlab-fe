
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';
import signInWithFacebook from '@/api/auth/auth_facebook';
import signInWithGmail from '@/api/auth/auth_gmail';
import { authFirebase } from '@/api/auth';
import { signOut } from 'firebase/auth';
import { GetAccessToken } from '@/api/auth/auth_get_token';
import { getRemainingMessage } from '@/api/GenerateMessageAPI';
interface UserContextInterface {
   user: LoginUser | null;
   remainingMessage: number;
   handleLogin: (typeLogin: string) => Promise<void>;
   handleLogout: () => Promise<void>;
   updateRemainingMessage: () => Promise<void>;
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
   const [remainingMessage, setRemainingMessage] = useState<number>(0);

   const updateRemainingMessage = async () => {
      const remainingMessage = await getRemainingMessage();
      setRemainingMessage(remainingMessage);
   }

   const setUserData = async (loginResult : any) => {
      let userData: LoginUser;
      const remainingMessage = await getRemainingMessage();

      if (!loginResult?.data.plan) {
         userData = { ...loginResult?.data.user,}
      } else {
         userData = {
            ...loginResult?.data.user,
            plan_id: loginResult?.data.plan.product.id,
            planType: loginResult?.data.plan.product.planType,
            maxMessages: loginResult?.data.plan.product.maxMessages,
            start_date: loginResult?.data.plan.start_date,
            end_date: loginResult?.data.plan.end_date,
         }
      }
      setRemainingMessage(remainingMessage);
      setUser(userData)
   }

   const UserLogin = async (token: string, loginFunction: () => any, platform: string, platformToken: string) => {
      try {
         const loginResult = await Login(token, platform, platformToken);

         // If login failed, try to login again
         if (loginResult?.status != 200) {
            console.error("Login failed, try again!")
         } else {
            console.log("Login success!")
            setUserData(loginResult)
         }

      } catch (error) {
         console.error("Error login:", error);
      }
   }

   const handleLogin = async (typeLogin: string) => {
      let result;
      let loginFunction;

      switch (typeLogin) {
         case "facebook":
            loginFunction = signInWithFacebook
            result = await loginFunction();
            localStorage.setItem("typeLogin", "facebook");
            break;
         case "gmail":
            loginFunction = signInWithGmail;
            result = await loginFunction();
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

         UserLogin(accessToken, loginFunction, typeLogin, platformToken)
         
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

         let loginFunction;

         switch (typeLogin) {
            case "facebook":
               loginFunction = signInWithFacebook
               break;
            case "gmail":
               loginFunction = signInWithGmail;
               break;
            default:
               console.error("type login is undefined")
               return;
         }
         const accessToken = await GetAccessToken();
         const platformToken = localStorage.getItem("pat") ?? '';
         UserLogin(accessToken, loginFunction, typeLogin, platformToken)
      } catch (error) {
         console.error("Error get user data:", error);
      }
   }

   

   useEffect(() => {
      // todo get user data
      getUserData();
   }, []);

   const current_context: UserContextInterface = {
      user: User || null,
      remainingMessage: remainingMessage,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      updateRemainingMessage: updateRemainingMessage,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}
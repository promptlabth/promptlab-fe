
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models/types/loginUser.type';
import { Login } from '@/services/api/UserAPI';
import { useRouter } from 'next/router';
import signInWithFacebook from '@/services/firebase/auth/AuthFacebook';
import signInWithGmail from '@/services/firebase/auth/AuthGmail';
import { authFirebase } from '@/services/firebase/AuthFirebase';
import { signOut } from 'firebase/auth';
import { getAccessToken } from '@/services/firebase/auth/GetTokenAuth';
import { apiGetGeneratedMessageCount } from '@/services/api/MessageAPI';
// import { getRemainingMessage } from '@/api/GenerateMessageAPI';
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
      // const remainingMessage = await getRemainingMessage();
      setRemainingMessage(remainingMessage);
   }

   const setUserData = async (loginResult : any) => {
      let userData: LoginUser;
      const remainingMessage = await apiGetGeneratedMessageCount();
      console.log("Remaining message", remainingMessage)
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
      console.log("userData", userData)
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
         const accessToken = await getAccessToken();
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
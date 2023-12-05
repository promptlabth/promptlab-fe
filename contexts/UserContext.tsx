
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
   setUser: (user: LoginUser) => void;
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


export function UserContextProvider({ children }: Props) {
   const [User, setUser] = useState<LoginUser>();
   const router = useRouter()
   const [remainingMessage, setRemainingMessage] = useState<number>(0);

   const delay = (ms: number) => new Promise(
      resolve => setTimeout(resolve, ms)
   );

   const UserLogin = async (token: string, loginFunction: () => any) => {
      try {

         const loginResult = await Login(token);

         if (loginResult?.status !== 200) {
            const result = await loginFunction();
            if (result) {

               // Retrieve the access token from the user data
               const accessToken = await result.user.getIdToken()
               const loginResult = await Login(accessToken);
               if (loginResult) {
                  const remainingMessage = await getRemainingMessage();
                  const userData: LoginUser = {
                     ...loginResult?.data.user,
                     ...loginResult?.data.plan,
                     plan_id: loginResult?.data.plan.id,
                     start_date: loginResult?.data.start_date,
                     end_date: loginResult?.data.end_date,
                  }
                  console.log(userData)
                  setRemainingMessage(remainingMessage);
                  setUser(userData)
               }
            }
         } else {
            const remainingMessage = await getRemainingMessage();

            const userData: LoginUser = {
               ...loginResult?.data.user,
               ...loginResult?.data.plan,
               plan_id: loginResult?.data.plan.id,
               start_date: loginResult?.data.start_date,
               end_date: loginResult?.data.end_date,
            }
            console.log(userData)
            setRemainingMessage(remainingMessage);
            setUser(userData)
         }
      } catch (error) {
         const result = await loginFunction();

         // Proceed if the sign-in with Facebook is successful
         if (result) {

            // Retrieve the access token from the user data
            const accessToken = await result.user.getIdToken()

            UserLogin(accessToken, loginFunction)
            await delay(200);
            router.reload()
         }
      }
   }

   const handleLogout = async () => {

      signOut(authFirebase).then(() => {
         localStorage.removeItem("at");
         localStorage.removeItem("rt");
      })
      await router.push("/")
      router.reload()
   }

   const handleLogin = async (typeLoginInput: string) => {
      // Sign in with Facebook to obtain a token
      let result;
      let loginFunction;
      if (typeLoginInput === "facebook") {
         // Login with facebook
         loginFunction = signInWithFacebook
         result = await loginFunction();
         localStorage.setItem("typeLogin", "facebook");

      } else if (typeLoginInput === "gmail") {
         loginFunction = signInWithGmail;
         result = await loginFunction();
         localStorage.setItem("typeLogin", "gmail");
      } else {
         console.log("error: You have a some bug 1")
         return;
      }

      // Proceed if the sign-in with Facebook is successful
      if (result) {

         // Retrieve the access token from the user data
         const accessToken = await result.user.getIdToken()
         UserLogin(accessToken, loginFunction)
         await delay(200);
         router.reload()
      }
   }

   const updateRemainingMessage = async () => {
      try {
         const remainingMessage = await getRemainingMessage();
         setRemainingMessage(remainingMessage);
      } catch (error) {
         console.error("Error updating remaining message:", error);
         // Handle error, maybe redirect to login page or show an error message
      }
   }

   const getUserData = async () => {
      try {
         const token = await GetAccessToken();
         let loginFunction;
         if (localStorage.getItem("typeLogin") === "facebook") {
            loginFunction = signInWithFacebook;
         } else if (localStorage.getItem("typeLogin") === "gmail") {
            loginFunction = signInWithGmail;
         } else {
            throw new Error("error: You are not logged in at this time");
         }

         if (token) {
            UserLogin(token, loginFunction);
         }

      } catch (error) {
         console.error("Error updating access token:", error);
         // Handle error, maybe redirect to login page or show an error message
      }
   };

   useEffect(() => {
      getUserData();
   }, []);

   const current_context: UserContextInterface = {
      user: User || null,
      remainingMessage: remainingMessage,
      setUser: setUser,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      updateRemainingMessage: updateRemainingMessage,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


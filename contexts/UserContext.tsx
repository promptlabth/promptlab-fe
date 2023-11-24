
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';
import signInWithFacebook from '@/api/auth/auth_facebook';
import signInWithGmail from '@/api/auth/auth_gmail';
import { authFirebase } from '@/api/auth';
import { signOut } from 'firebase/auth';
import { GetAccessToken } from '@/api/auth/auth_get_token';
interface UserContextInterface {
   user: LoginUser | null;
   generateCount : number;
   setUser: (user: LoginUser) => void;
   handleLogin: (typeLogin: string) => Promise<void>;
   handleLogout: () => Promise<void>;
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
   const generateCount : number = 79;

   const delay = (ms : number) => new Promise(
      resolve => setTimeout(resolve, ms)
   );

   const UserLogin = async (token: string, loginFunction : () => any) => {
      try {

         const loginResult = await Login(token);

         if (loginResult?.status !== 200) {
            localStorage.removeItem("at");
            localStorage.removeItem("rt");
            const result = await loginFunction();
            if (result) {

               // Retrieve the access token from the user data
               const accessToken = await result.user.getIdToken()
               const refreshToken = result.user.refreshToken
               localStorage.setItem("at", accessToken);
               localStorage.setItem("rt", refreshToken);
               const loginResult = await Login(accessToken);
               if (loginResult) {
                  setUser(loginResult?.data)
                  console.log("relogin-user", loginResult?.data)
               }
            }
         } else {
            setUser(loginResult?.data)
         }
      } catch (error) {
         const result = await loginFunction();
         console.log("FACEBOOK", result)

         // Proceed if the sign-in with Facebook is successful
         if (result) {

            // Retrieve the access token from the user data
            const accessToken = await result.user.getIdToken()

            const refreshToken = result.user.refreshToken
            localStorage.setItem("at", accessToken);
            localStorage.setItem("rt", refreshToken);

            UserLogin(accessToken, loginFunction)
            await delay(200);
            router.reload()
         }
      }
   }

   const handleLogout = async () => {

      signOut(authFirebase).then((value) => {
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
      if(typeLoginInput === "facebook"){
         // Login with facebook
         loginFunction = signInWithFacebook
         result = await loginFunction();
         localStorage.setItem("typeLogin", "facebook");

      }else if(typeLoginInput === "gmail"){
         loginFunction = signInWithGmail;
         result = await loginFunction();
         localStorage.setItem("typeLogin", "gmail");
      }else{
         console.log("error: You have a some bug 1")
         return;
      }
      console.log("Login", result)

      // Proceed if the sign-in with Facebook is successful
      if (result) {

         // Retrieve the access token from the user data
         const accessToken = await result.user.getIdToken()

         const refreshToken = result.user.refreshToken
         localStorage.setItem("at", accessToken);
         localStorage.setItem("rt", refreshToken);

         UserLogin(accessToken, loginFunction)
         await delay(200);
         // router.reload()
      }
   }


   const updateAccessToken = async () => {
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
            console.log("token", token)
            await UserLogin(token, loginFunction);
         }
      } catch (error) {
         console.error("Error updating access token:", error);
         // Handle error, maybe redirect to login page or show an error message
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         await updateAccessToken();
         console.log("Current User:", User);
      };

      fetchData();
   }, []);

   const current_context: UserContextInterface = {
      user: User || null,
      generateCount,
      setUser: setUser,
      handleLogin: handleLogin,
      handleLogout: handleLogout
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


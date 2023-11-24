
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';
import signInWithFacebook from '@/api/auth/auth_facebook';
import signInWithGmail from '@/api/auth/auth_gmail';
import { authFirebase } from '@/api/auth';
import { signOut } from 'firebase/auth';
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
            console.log("user", loginResult?.data)
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


   /**
    * This useEffect function retrieves the access token from local storage.
    * It then checks whether the access token has a value or not.
    * If the token exists, it logs in the user using the retrieved access token.
    **/
   useEffect(() => {
      const token = localStorage.getItem("at")
      const refToken = localStorage.getItem("rt")

      // TODO Check that access token is expired or not
      // Pseudo code
      // Encode access token(which is JWT token) and get `iat` and `exp`
      // If token is expire then get a new access token

      let loginFunction;
      if(localStorage.getItem("typeLogin") === "facebook"){
         // Login with facebook
         loginFunction = signInWithFacebook
      }else if(localStorage.getItem("typeLogin") === "gmail"){
         loginFunction = signInWithGmail;
      }else{
         console.log("error: You not login in this time")
         return;
      }
      
      if (token) {
         UserLogin(token, loginFunction);
      } 
   }, [])

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


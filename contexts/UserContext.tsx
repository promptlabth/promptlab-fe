
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';
import signInWithFacebook from '@/api/auth/auth_facebook';
import signInWithGmail from '@/api/auth/auth_gmail';
import { authFirebase } from '@/api/auth';
import { jwtDecode } from "jwt-decode";

interface UserContextInterface {
   user: LoginUser | null;
   setUser: (user: LoginUser) => void;
   handleLogin: (typeLogin: string) => Promise<void>;
   handleLogout: () => Promise<void>;
}

function isAccessTokenExpired(accessToken: string): boolean {
   const decoded = jwtDecode(accessToken);
   const accessTokenExpirationTime = decoded.exp; // Get token expiration date

   const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000); // Convert current time to seconds

   // Check if token is expired
   // If exp time is less than current time it means token is expired
   return accessTokenExpirationTime! < currentTimeInSeconds;
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

   const delay = (ms : number) => new Promise(
      resolve => setTimeout(resolve, ms)
   );
   
   // Function for login user
   const UserLogin = async (token: string, loginFunction : () => any) => {
      // Parameters
      // tokem : access token
      // loginFunction : function for login
      try {

         // Check that access token is expired or not
         const isExpired = isAccessTokenExpired(token);

         // If token is not expired
         if (!isExpired) {

         }
         // Login with access token
         const loginResult = await Login(token);
         

         // If login fail (Status code is not 200)
         if (loginResult?.status !== 200) {

            // Remove access token and refresh token from local storage
            localStorage.removeItem("at");
            localStorage.removeItem("rt");

            // Call login function for user credentials
            const result = await loginFunction();
            if (result) {

               // Retrieve the access token and refresh token from the user data
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
      localStorage.removeItem("at");
      localStorage.removeItem("rt");
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
         router.reload()
      }
   }


   /**
    * This useEffect function retrieves the access token from local storage.
    * It then checks whether the access token has a value or not.
    * If the token exists, it logs in the user using the retrieved access token.
    **/
   useEffect(() => {

      // Get access token and refresh token from local storage
      const accessToken = localStorage.getItem("at")
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
      
      // Automically login to ger user data when user refresh page
      if (accessToken) {
         UserLogin(accessToken, loginFunction);
      } 
   }, [])

   const current_context: UserContextInterface = {
      user: User || null,
      setUser: setUser,
      handleLogin: handleLogin,
      handleLogout: handleLogout
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


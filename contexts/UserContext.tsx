import signInWithFacebook from '@/api/auth/auth_facebook';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';
interface UserContextInterface {
   user: LoginUser | null;
   setUser: (user: LoginUser) => void;
   handleLogin: () => Promise<void>;
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
   const UserLogin = async (token: string) => {
      try {

         const loginResult = await Login(token);

         if (loginResult?.status !== 200) {
            localStorage.removeItem("at");
            localStorage.removeItem("rt");
            const result = await signInWithFacebook();
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
         const result = await signInWithFacebook();
         console.log("FACEBOOK", result)

         // Proceed if the sign-in with Facebook is successful
         if (result) {

            // Retrieve the access token from the user data
            const accessToken = await result.user.getIdToken()

            const refreshToken = result.user.refreshToken
            localStorage.setItem("at", accessToken);
            localStorage.setItem("rt", refreshToken);

            UserLogin(accessToken)
            router.reload()
         }
      }
   }

   const handleLogout = async () => {
      localStorage.removeItem("at");
      localStorage.removeItem("rt");
      router.reload()
   }

   const handleLogin = async () => {

      // Sign in with Facebook to obtain a token
      const result = await signInWithFacebook();
      console.log("FACEBOOK", result)

      // Proceed if the sign-in with Facebook is successful
      if (result) {

         // Retrieve the access token from the user data
         const accessToken = await result.user.getIdToken()

         const refreshToken = result.user.refreshToken
         localStorage.setItem("at", accessToken);
         localStorage.setItem("rt", refreshToken);

         UserLogin(accessToken)
         router.reload()
      }
   }

   /**
    * This useEffect function retrieves the access token from local storage.
    * It then checks whether the access token has a value or not.
    * If the token exists, it logs in the user using the retrieved access token.
    **/
   useEffect(() => {
      const token = localStorage.getItem("at")

      // TODO Check that access token is expired or not
      // Pseudo code
      // Encode access token(which is JWT token) and get `iat` and `exp`
      // If token is expire then get a new access token

      if (token) {
         UserLogin(token)
      }
   }, [])

   const current_context: UserContextInterface = {
      user: User || null,
      setUser: setUser,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


import signInWithFacebook from '@/api/auth/auth_facebook';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
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
      const loginUser = await Login(token);
      setUser(loginUser)
   }

   const handleLogout = async () => {
      localStorage.removeItem("accessToken");
      deleteCookie("rt");
      deleteCookie("at");
      router.reload()
   }

   const handleLogin = async () => {

      // Sign in with Facebook to obtain a token
      const result = await signInWithFacebook();

      // Proceed if the sign-in with Facebook is successful
      if (result) {

         // Retrieve the access token from the user data
         const accessToken = await result.user.getIdToken()

         const refreshToken = result.user.refreshToken
         
         setCookie("rt",refreshToken)
         setCookie("at",accessToken)

         UserLogin(accessToken)
         // Set access token to local storage
         localStorage.setItem('accessToken', accessToken);

         router.reload()
      }
   }

   /**
    * This useEffect function retrieves the access token from local storage.
    * It then checks whether the access token has a value or not.
    * If the token exists, it logs in the user using the retrieved access token.
    **/
   useEffect(() => {
      const token = getCookie("at")?.toString()
      console.log(token)
      
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


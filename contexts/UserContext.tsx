import signInWithFacebook from '@/api/auth/auth_facebook';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';
import { useRouter } from 'next/router';

interface UserContextInterface {
   user: LoginUser | null
   setUser: (user: LoginUser) => void;
   handleLogin: () => Promise<void>;
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

   const handleLogin = async () => {

      // Sign in with Facebook to obtain a token
      const result = await signInWithFacebook();

      // Proceed if the sign-in with Facebook is successful
      if (result) {

         // Retrieve the access token from the user data
         const accessToken = await result.user.getIdToken()
         
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
      const token = localStorage.getItem("accessToken")
      if (token) {
         UserLogin(token)
      }
   }, [User])

   const current_context: UserContextInterface = {
      user: User || null,
      setUser: setUser,
      handleLogin: handleLogin,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


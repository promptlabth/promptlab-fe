import signInWithFacebook from '@/api/auth/auth_facebook';
import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { LoginUser } from '@/models';
import { Login } from '@/api/LoginAPI';

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
   const [User, setUser] = useState<LoginUser>(); // Initialize modal show status to false
   const currentAccessToken = localStorage.getItem('accessToken');
   
   const UserLogin = async () => {
      if (currentAccessToken){
         const loginUser = await Login(currentAccessToken);
         setUser(loginUser)
      } 
   }

   /**
    * User login function. It execute when user click login button
    **/
   const handleLogin = async () => {

      // sign in with facebook to get token 
      const result = await signInWithFacebook();

      if (result) {

         // Print login success
         const accessToken = await result.user.getIdToken()
         // .then(
         //    (token) => {
         //       return token
         //    }
         // );

         const loginUser = await Login(accessToken);
         setUser(loginUser)

         localStorage.setItem('accessToken', accessToken);
         // localStorage.setItem('user', JSON.stringify(loginUser));
      }
   }

   useEffect(()=>{
      UserLogin()
      // handleLogin()
   },[])

   const current_context: UserContextInterface = {
      user: User || null,
      setUser: setUser,
      handleLogin: handleLogin,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


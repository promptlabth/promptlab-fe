import signInWithFacebook from '@/api/auth/auth_facebook';
import { ReactNode, createContext, useContext, useState } from 'react';
import { User } from '@/models';
import { Login } from '@/api/LoginAPI';

interface UserContextInterface {
   user: User | null
   setUser: (user: User) => void;
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
   const [user, setUser] = useState<User>(); // Initialize modal show status to false
   
   const handleLogin = async () => {
      
      // sign in with facebook to get token 
      const result = await signInWithFacebook();

      if (result){
         console.log("Facebook login successful:", result);
      }
   }

   const current_context: UserContextInterface = {
      user: null,
      setUser: setUser,
      handleLogin: handleLogin,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


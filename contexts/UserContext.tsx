import signInWithFacebook from '@/api/auth/auth_facebook';
import { ReactNode, createContext, useContext, useState } from 'react';
import { User } from '@/models';

interface UserContextInterface {
   user: User | null
   setUser: (user: User) => void;
   handleFacebookLogin: () => Promise<void>; // Function to update modal show status

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
   
   // Wait API url
   const apiUrl = "?????";

   // Not complete function, wait api url
   const getUser = async () => {
      // Code for fetch user data
      // Code for fetch user data
      // Code for fetch user data
      // Code for fetch user data
      
   }


   const handleFacebookLogin = async () => {
      const result = await signInWithFacebook();
      if (result) {
         console.log("Facebook login successful:", result);

         // get user from db
         getUser();  

      } else {
         console.log("Facebook login failed");
      }
   }


   const current_context: UserContextInterface = {
      user: null,
      setUser: setUser,
      handleFacebookLogin: handleFacebookLogin,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}


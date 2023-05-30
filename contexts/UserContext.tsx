import signInWithFacebook from '@/api/autth/auth_facebook';
import { MouseEventHandler, createContext, useContext, useState } from 'react';

interface User {
   /* 
       id: Optional[int] = Field(default=None, primary_key=True)
   uid : Optional[str] = Field(default=None, unique=True)
   name: Optional[str] = None
   email: str
   profilepic: str
   */
   id: number;
   uid: string;
   name: string;
   email: string;
   profilepic: string;
}

interface UserContextInterface {
   user: User | null
   setUser: (user: User) => void;
   handleFacebookLogin: () => Promise<void>; // Function to update modal show status

}
// Create user context
const UserContext = createContext<UserContextInterface | null>(null);


// Type '(event: any) => Promise<void>' is not assignable to type '() => void'.

interface Props {
   children: React.ReactNode;
}

export function useUserContext() {
   return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
   const [user, setUser] = useState<User>(); // Initialize modal show status to false

   const handleFacebookLogin = async () => {
      const result = await signInWithFacebook();
      console.log(result)
      if (result) {
         // onLogin(result)
         console.log("Facebook login successful:", result);
         console.log(result)

         //* Logic for set user
         // Statement
         // Statement
         // Statement
         // Statement


      } else {
         console.log("Facebook login failed");
      }
   }


   const current_context: UserContextInterface = {
      user: null,
      setUser: setUser,
      handleFacebookLogin : handleFacebookLogin,
   }
   return (
      <UserContext.Provider value={current_context}> {children} </UserContext.Provider>
   )
}

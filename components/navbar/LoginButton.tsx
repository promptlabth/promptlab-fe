import signInWithFacebook from '@/api/autth/auth_facebook';
import React, { MouseEventHandler } from 'react';
import { Button } from 'react-bootstrap';
import { BiLogIn } from 'react-icons/bi';
import { useUserContext } from '@/contexts/UserContext';
// Import signInWithFacebook function here

const LoginComponent = () => {
   const userContext = useUserContext();

   return (
      <div className="d-flex">
         <Button variant="outline-light" className="d-flex" onClick={userContext?.handleFacebookLogin}>
            Login
            <div className="">
               <BiLogIn size={25} />
            </div>
         </Button>
      </div>
   );
};

export default LoginComponent;

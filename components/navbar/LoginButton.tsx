import signInWithFacebook from '@/api/autth/auth_facebook';
import React from 'react';
import { Button } from 'react-bootstrap';
import { BiLogIn } from 'react-icons/bi';

// Import signInWithFacebook function here

interface LoginComponentProps {
  onLogin: (result: any) => void;
}



const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin }) => {

  async function handleFacebookLogin() {
    const result = await signInWithFacebook();
    if (result) {
      onLogin(result)
      console.log("Facebook login successful:", result);
    } else {
      console.log("Facebook login failed");
    }
  }


  return (
      <div className="d-flex">
          <Button variant="outline-light" className="d-flex" onClick={handleFacebookLogin}>
              Login
              <div className="">
                  <BiLogIn size={25}/>
              </div>
          </Button>
      </div>
  );
};

export default LoginComponent;

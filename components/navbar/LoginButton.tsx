import signInWithFacebook from '@/api/autth/auth_facebook';
import React from 'react';

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
    <div>
      <button onClick={handleFacebookLogin}>Login with Facebook</button>
    </div>
  );
};

export default LoginComponent;

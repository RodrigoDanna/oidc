import React from 'react';
import useAuth from './../hooks/useAuth';

const LoginButton:React.FC = () => {
  const auth = useAuth();
  const { auth: { signin }, authorized } = auth;

  if (authorized) {
    return null;
  }

  return (
    <button onClick={signin}>
      Log In
    </button>
  )
}

export default LoginButton

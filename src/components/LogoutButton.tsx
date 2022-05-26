import React from 'react';
import useAuth from '../hooks/useAuth';

const LogoutButton = () => {
  const auth = useAuth();
  const { auth: { signout }, authorized } = auth;

  if (!authorized) {
    return null;
  }

  return (
    <button onClick={signout}>
      Log Out
    </button>
  )
}

export default LogoutButton
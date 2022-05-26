import React from 'react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const auth = useAuth();
  const { authorized, user } = auth;

  console.log(authorized, user);

  if (!authorized) {
    return null;
  }

  return (
    <div>
      {JSON.stringify(user, null, 2)}
    </div>
  )
}

export default Profile

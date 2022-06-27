import React, { useCallback, useState } from 'react';
import useAuth from './../hooks/useAuth';

const LoginButton:React.FC = () => {
  const auth = useAuth();
  const { auth: { signin }, authorized } = auth;
  const [email, setEmail] = useState<string>("");

  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [])

  const onSubmit = useCallback(() => {
    signin(email);
  },[email])

  if (authorized) {
    return null;
  }

  return (
    <div>
      <input type="text" onChange={handleChange}/>
      <button onClick={onSubmit}>Log In</button>
    </div>
  )
}

export default LoginButton

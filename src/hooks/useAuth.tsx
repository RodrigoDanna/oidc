import { User } from "oidc-client-ts";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";

const useAuth = () => { 
  const auth = useContext(AuthContext);
  const { isAuthenticated, user:getUser } = auth;

  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => { 
    setAuthorized(isAuthenticated());
    getUser().then((u: React.SetStateAction<User | null>) => setUser(u));
  }, []);

  return {
    authorized, auth, user
  }
}

export default useAuth;
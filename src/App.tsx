import React from 'react';
import OidcClient from './components/OidcClient';
import LoginButton from "./components/LoginButton";
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

const api = new OidcClient();

export const AuthContext = React.createContext<OidcClient>(api);

const App = () => {
  return (
    <div className="App">
      <AuthContext.Provider value={api}>
        <LoginButton />
        <LogoutButton />
        <Profile />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
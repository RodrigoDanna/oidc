import React from 'react';
import ClientOidc from './api/ClientOidc';
import LoginButton from "./components/LoginButton";
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

const api = new ClientOidc();

export const AuthContext = React.createContext<ClientOidc>(api);

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
import React from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import TestProfile from './views/TestProfile';
import { useAuth0 } from '@auth0/auth0-react';

const TestApp = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <h1>Welcome</h1>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {isAuthenticated ? <TestProfile /> : <div>You need to login or signup</div>}
      
    </div>
  );
};

export default TestApp;

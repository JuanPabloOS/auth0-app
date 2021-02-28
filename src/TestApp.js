import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TestProfile from './views/TestProfile';
import LoginButton from './components/LoginButton';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Global";
import { lightTheme, darkTheme } from "./components/Themes"

const Provider = ({ role }) => {
  const [theme, setTheme] = useState(true);
  const change = () => {
    setTheme(!theme);
  }
  return (
    <ThemeProvider theme={theme ? lightTheme : darkTheme} role={role} >
      <>
        <GlobalStyles role={role} />
        <TestProfile change={change} />
      </>
    </ThemeProvider>
  );
}
const TestApp = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [role, setRole] = useState('B');
  useEffect(() => {
    if (isAuthenticated && user) {
      setRole(user['http://localhost:3000/roles'][0] === 'A' ? "A" : 'B');
    }
  }, [isAuthenticated, user]);
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: 'center',
      width: '100%',
    }}>
      {isLoading && <h1>Loading...</h1>}
      {isAuthenticated ? <Provider role={role} /> : <div>You need to login or signup to continue</div>}
      {!isAuthenticated ? <LoginButton /> : null}
    </div>
  );
};

export default TestApp;

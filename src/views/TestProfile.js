import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ThemeButton from '../components/ThemeButton';
import LogoutButton from '../components/LogoutButton';
import { serverURL } from '../auth_config.json';

const TestProfile = ({ change }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState('B');
  const [message, setMessage] = useState("");
  const [id, setID] = useState("");
  const [tokenReponse, setToken] = useState("");
  const call = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverURL}/auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setMessage(responseData.payload);
      setID(responseData.userID);
      setToken(responseData.token);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      setRole(user['http://localhost:3000/roles'][0]);
    }
  }, [isAuthenticated, user]);

  return isLoading ? <h1>Loading...</h1> :
    isAuthenticated ? (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center',
      }}>
        <img src={user.picture} alt={user.name} />
        <h1>Role {role}</h1>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {isAuthenticated ? <ThemeButton change={change} /> : null}
        <br />
        <button onClick={call}>Call API</button>
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {message}
        </code>
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {id}
        </code>
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {tokenReponse}
        </code>
        <br />
        {isAuthenticated && <LogoutButton />}
      </div>
    ) : (
        'Anonymous user'
      );
};

export default TestProfile;

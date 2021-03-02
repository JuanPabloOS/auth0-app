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
      console.log(responseData);
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
      setRole(user['http://localhost:3000/roles'][0] === 'A' ? 'A' : 'B');
    }
  }, [isAuthenticated, user]);

  return isLoading ? <h1>Loading...</h1> :
    isAuthenticated ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h1>Role {role}</h1>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {isAuthenticated ? <ThemeButton change={change} /> : null}
        <br />
        <br />
        <button onClick={call}>Call API</button>
        <br />
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {message}
        </code>
        <br />
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {id}
        </code>
        <br />
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {tokenReponse}
        </code>
        <br />
        <br />
        {isAuthenticated && <LogoutButton />}
      </div>
    ) : (
        'Anonymous user'
      );
};

export default TestProfile;

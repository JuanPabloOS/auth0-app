import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import ThemeButton from '../components/ThemeButton';
import LogoutButton from '../components/LogoutButton';
import { serverURL } from '../auth_config.json';
import { clientID, clientSecret, audience, apiURL } from '../auth_config_m2m.json';
import Groups from '../components/Groups';

const TestProfile = ({ change }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState('B');
  const [message, setMessage] = useState("");
  const [id, setID] = useState("");
  const [tokenReponse, setToken] = useState("");
  const [groupsinfo, setGroupsInfo] = useState([]);
  // const [authToken, setAuthToken] = useState("");
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
  const getAuthToken = () => {
    return axios({
      method: 'post',
      url: 'https://viaducto-jl-rojas.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'client_credentials',
        client_id: clientID,
        client_secret: clientSecret,
        audience: audience,
      }
    });
  }
  const groups = () => {
    getAuthToken()
      .then(response => {
        // setAuthToken(`${response.data.token_type} ${response.data.access_token}`);
        var token = `${response.data.token_type} ${response.data.access_token}`;
        console.log(token);
        axios({
          method: 'get',
          url: apiURL + "/groups",
          headers: {
            'Authorization': token
          }
        }).then(response => {
          console.log(response);
          setGroupsInfo(response.data.groups)
        }).catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
      });
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
        <button onClick={groups}>See groups</button>
        <br />
        <code style={{ color: 'lightblue', padding: '1rem' }}>
          {groupsinfo.map(a => <p key={a.name}>{a.name}</p>)}
        </code>
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
        <br />
        {isAuthenticated && !isLoading ? <Groups /> : null}
        <br />
        {isAuthenticated && <LogoutButton />}
      </div>
    ) : (
      'Anonymous user'
    );
};

export default TestProfile;

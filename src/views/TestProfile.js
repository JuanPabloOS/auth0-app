import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ThemeButton from '../components/ThemeButton';
import LogoutButton from '../components/LogoutButton';

const TestProfile = ({ change }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [role, setRole] = useState('B');

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
        <br />
        {isAuthenticated && <LogoutButton />}
      </div>
    ) : (
        'Anonymous user'
      );
};

export default TestProfile;

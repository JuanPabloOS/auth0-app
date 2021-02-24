import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TestProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [color, setColor] = useState('white');
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user['http://localhost:3000/roles'][0];
      if (role && role === 'Admin') {
        setColor('green');
        setRole("Admin")
      }
    }
  }, [isAuthenticated, user]);
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color,
      }}
    >
      {
        role && role==="Admin" ? <h1>A</h1> : <h1>B</h1>
      }
      <pre>{JSON.stringify(user, null, 3)}</pre>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    'Anonymous user'
  );
};

export default TestProfile;

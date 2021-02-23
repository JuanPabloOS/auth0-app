import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const TestProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
          <div>
              <pre>{ JSON.stringify(user,null,3)}</pre>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ): "Anonymous user"
  ) ;
};

export default TestProfile;
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import TestApp from './TestApp'
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import config from './auth_config.json';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.client_id}
    redirectUri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    audience={config.audience}
  >
    <TestApp />
  </Auth0Provider>,
  document.getElementById("root")
);

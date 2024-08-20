import { useEffect, useState } from "react";
import "./App.css";
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { loginRequest } from "./configs/auth-config";
import { InteractionType } from "@azure/msal-browser";

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [userName, setUserName] = useState<string | null>(null);

  const redirectAuth = useMsalAuthentication(
    InteractionType.Redirect,
    loginRequest
  );

  useEffect(() => {
    if (instance === null || instance === undefined || !isAuthenticated) {
      redirectAuth;
    } else if (isAuthenticated) {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        setUserName(accounts[0].username);
      }
    }
  }, [instance, isAuthenticated, redirectAuth]);
  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div>
      <h1>Msal Example</h1>
      {isAuthenticated && (
        <div>
          <p>Hoş geldin {userName}!</p>
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      )}
    </div>
  );
}

export default App;

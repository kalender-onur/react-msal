import { createRoot } from "react-dom/client";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import App from "./App";
import { msalConfig } from "./configs/auth-config";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);
createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={msalInstance}>
    <App />
  </MsalProvider>
);

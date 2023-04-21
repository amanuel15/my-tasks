import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MainProvider } from "./context/MainContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ItemContextProvider } from "./Components/Contexts/ItemContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ItemContextProvider>
      <App />
    </ItemContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ItemContextProvider } from "./Components/Contexts/ItemContext";
import { Provider } from "react-redux";
import mainStore from "./store/mainStore";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={mainStore}>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </Provider>
  </React.StrictMode>
);

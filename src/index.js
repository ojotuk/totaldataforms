import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'react-notifications/lib/notifications.css';
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {GlobalProvider} from "./GlobalStore/GlobalProvider"
ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
    <Router>
      <App />
    </Router>
    </GlobalProvider>
  </React.StrictMode>
  ,
  document.getElementById("root")
);

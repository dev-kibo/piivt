import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css"
import "./index.sass";
import Application from "./components/Application/Application";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
    <React.StrictMode>
      <Router>      
        <Application />
      </Router>
    </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

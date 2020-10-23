import React from "react";
import "./App.css";
import "./styles/grid-display.css";
import "./styles/editor.css";
import "./styles/default-template.css";
import "./styles/specials/alice-neuville.css";
import "./styles/feed-manager.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";

function App(props) {
  return (
    <BrowserRouter>
      <div className="App">
        <Dashboard
          isLoggedin={props.isLoggedin}
          testUserSetting={props.testUserSetting}
          user={props.user}
          routes={props.routes}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

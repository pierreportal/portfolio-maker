import React from "react";
import "./App.css";
import "./styles/grid-display.css";
import "./styles/editor.css";
import "./styles/default-template.css";
import "./styles/specials/alice-neuville.css";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter } from "react-router-dom";

const isLoggedin = true;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Dashboard isLoggedin={isLoggedin} />
      </div>
    </BrowserRouter>
  );
}

export default App;

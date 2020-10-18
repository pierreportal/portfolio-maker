import React from "react";
import "./App.css";
import "./styles/grid-display.css";
import "./styles/editor.css";
import "./styles/default-template.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";

const isLoggedin = true;

function App() {
  return (
    <div className="App">
      <Dashboard isLoggedin={isLoggedin} />
    </div>
  );
}

export default App;

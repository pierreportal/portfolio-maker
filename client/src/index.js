import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { getSettings } from "./api";
const isLoggedin = true;

const user = {
  name: "Alice Neuville",
};

const routes = [
  {
    path: "/",
    feedName: "main",
    templateName: "mainPage",
  },
  {
    path: "/contact",
    feedName: "contact",
    templateName: "contact",
  },
];

getSettings().then((data) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        testUserSetting={data[0]}
        isLoggedin={isLoggedin}
        user={user}
        routes={routes}
      />
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

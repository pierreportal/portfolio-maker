import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { getSettings, getUser } from "./api";

const defaultUserSetting = {
  font: "helvetica",
  bgColor: "white",
  headMenu: true,
  sideBar: true,
  headingDefaultMargin: false,
  languages: ["fr", "en"],
  siteTitle: "Porfolio Maker",
  routes: [
    {
      path: "/",
      feedName: "main",
      templateName: "mainPage",
      label: "Home",
    },
  ],
};

const isLoggedin = true;

getUser().then((user) => {
  getSettings().then((data) => {
    if (data[0]) document.title = data[0].siteTitle;

    return ReactDOM.render(
      <React.StrictMode>
        <App
          testUserSetting={data[0] || defaultUserSetting}
          isLoggedin={isLoggedin}
          user={user}
          routes={data[0] || defaultUserSetting.routes}
        />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

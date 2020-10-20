import React from "react";
// import routes from "../routes/AN/settings.json";
// import Dashboard from "./dashboard/Dashboard";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

export default function Routing(props) {
  const { isLoggedin, user, testUserSetting, routes } = props;
  return (
    <Switch>
      <Route
        exact={true}
        path="/"
        component={() => (
          <MainPage
            isLoggedin={isLoggedin}
            user={user}
            testUserSetting={testUserSetting}
            routes={routes}
          />
        )}
      />
    </Switch>
  );
}

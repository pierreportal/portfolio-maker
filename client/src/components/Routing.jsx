import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";

export default function Routing(props) {
  const { isLoggedin, user, testUserSetting, routes } = props;
  return (
    <Switch>
      {routes.map((r) => {
        return (
          <Route
            exact={true}
            path={r.path}
            component={() => (
              <MainPage
                isLoggedin={isLoggedin}
                user={user}
                testUserSetting={testUserSetting}
                routes={routes}
                feedName={r.feedName}
                templateName={r.templateName}
              />
            )}
          />
        );
      })}
    </Switch>
  );
}

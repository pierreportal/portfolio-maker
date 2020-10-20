import React from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { AnimatedSwitch } from "react-router-transition";

export default function Routing(props) {
  const { isLoggedin, user, testUserSetting, routes } = props;
  return (
    <Switch>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
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
      </AnimatedSwitch>
    </Switch>
  );
}

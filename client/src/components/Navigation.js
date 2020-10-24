import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import AddElementButton from "./UIElements/AddElementButton";

export default function Navigation(props) {
  const { testUserSetting } = props;
  const { routes } = testUserSetting;

  const [stateRoutes, setStateRoute] = useState(routes);

  const addNewRoute = (routeLabel) => {
    const newRoute = {
      path: `/${routeLabel.toLowerCase().split(" ").join("-")}`,
      feedName: routeLabel.toLowerCase(),
      templateName: routeLabel.toLowerCase(),
      label: routeLabel,
    };
    console.log("newRoute: ", newRoute);
    setStateRoute([...stateRoutes, newRoute]);
  };

  const deleteRoute = (routeToDelete) => {
    const newRouteList = stateRoutes.filter(
      (r) => r.path !== routeToDelete.path
    );
    setStateRoute(newRouteList);
  };

  const links = stateRoutes.map((x) => {
    return (
      <li key={x} className="row align-item-center">
        <NavLink activeClassName="active" exact to={x.path}>
          {x.label}
        </NavLink>
        {x.path !== "/" && (
          <div
            onClick={() => deleteRoute(x)}
            className="remove-element-button-cross"
          >
            +
          </div>
        )}
      </li>
    );
  });
  return (
    <>
      {links}
      <AddElementButton
        options={["label"]}
        action={addNewRoute}
        placeHolder={"Add new route"}
      />
    </>
  );
}

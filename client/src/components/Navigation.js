import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation(props) {
  const { testUserSetting } = props;
  const { routes } = testUserSetting;
  const links = routes.map((x) => {
    return (
      <li key={x}>
        <NavLink activeClassName="active" exact to={x.path}>
          {x.label}
        </NavLink>
      </li>
    );
  });
  return <>{links}</>;
}

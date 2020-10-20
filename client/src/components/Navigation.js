import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes/AN/settings.json";

export default function Navigation(props) {
  const { navigationRoutes } = props;
  const links = routes[navigationRoutes].map((x) => {
    return (
      <li key={x}>
        <NavLink activeClassName="active" exact to={x.url}>
          {x.label}
        </NavLink>
      </li>
    );
  });
  return <>{links}</>;
}

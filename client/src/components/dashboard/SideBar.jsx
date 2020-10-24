import React, { useState } from "react";
import Navigation from "../Navigation";

export default function SideBar(props) {
  const { testUserSetting } = props;

  return (
    <div className="dashboard-sidebar col">
      <ul>
        <Navigation testUserSetting={testUserSetting} />
      </ul>
    </div>
  );
}

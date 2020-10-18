import React, { useState } from "react";

export default function SideBar(props) {
  return (
    <div className="dashboard-sidebar col">
      <ul>
        <li>
          <b>Work</b>
        </li>
        <li>Me</li>
        <li>Contact</li>
      </ul>
    </div>
  );
}

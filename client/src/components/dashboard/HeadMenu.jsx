import React, { useState } from "react";

export default function HeadMenu(props) {
  const { isLoggedin } = props;
  return (
    <div className={`dashboard-headmenu`} style={{ height: "3rem" }}>
      <h1 contentEditable={isLoggedin}>Pierre Portal</h1>{" "}
      <p>Photographer & software engineer</p>
    </div>
  );
}

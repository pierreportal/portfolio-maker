import React, { useState } from "react";

export default function HeadMenu(props) {
  const { isLoggedin, testUserSetting } = props;
  return (
    <div className={`dashboard-headmenu row`} style={{ height: "3rem" }}>
      <h1>{testUserSetting.siteTitle}</h1>
    </div>
  );
}

import React, { useState } from "react";

export default function AliceRollMenu(props) {
  const { style, navigationRoutes } = props;
  const navLabels = navigationRoutes.map((x) => <div key={x}>{x.label}</div>);
  const content = <div className="alicerollmenu-content row">{navLabels}</div>;

  return (
    <div className="row alicerollmenu" style={style}>
      {/* {content} */}
      {content}
    </div>
  );
}

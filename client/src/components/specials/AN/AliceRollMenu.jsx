import React, { useState } from "react";

export default function AliceRollMenu(props) {
  const { style, navigationRoutes, text } = props;

  const navLabels = navigationRoutes ? (
    navigationRoutes.map((x) => <div key={x}>{x.label}</div>)
  ) : (
    <div>{text}</div>
  );

  const content = <div className="alicerollmenu-content row">{navLabels}</div>;

  return (
    <div className="row alicerollmenu" style={style}>
      {/* {content} */}
      {content}
    </div>
  );
}

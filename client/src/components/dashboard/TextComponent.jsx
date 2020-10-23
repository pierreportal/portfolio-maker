import React, { useState } from "react";

export default function TextComponent(props) {
  const { content, params, style, isLoggedin } = props;

  return (
    <div className="text-component" style={style}>
      <p>{content}</p>
    </div>
  );
}

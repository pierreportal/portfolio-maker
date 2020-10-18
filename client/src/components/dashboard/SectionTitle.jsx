import React, { useState } from "react";

export default function SectionTitle(props) {
  const { content, params, style, isLoggedin } = props;

  const heading =
    params.level === "1" ? (
      <h1 contentEditable={isLoggedin} style={style}>
        {content}
      </h1>
    ) : params.level === "2" ? (
      <h2 contentEditable={isLoggedin} style={style}>
        {content}
      </h2>
    ) : (
      <h3 contentEditable={isLoggedin} style={style}>
        {content}
      </h3>
    );

  return <div className="section-title">{heading}</div>;
}

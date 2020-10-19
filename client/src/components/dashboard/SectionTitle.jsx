import React, { useState } from "react";

export default function SectionTitle(props) {
  // "width": "90%",
  // "padding": "1rem 0",
  // "textAlign": "left",
  // "margin": "0 auto",
  // "fontWeight": "bold",
  // "backgroundColor": "transparent"

  const { content, params, style, isLoggedin } = props;

  const divStyling = {
    width: style.width,
    textAlign: style.textAlign,
    backgroundColor: style.backgroundColor,
    margin: style.margin,
    color: style.color,
  };
  const headerStyling = {
    padding: style.padding,
    fontWeight: style.fontWeight,
  };

  const heading =
    params.level === "1" ? (
      <h1 contentEditable={isLoggedin} style={headerStyling}>
        {content}
      </h1>
    ) : params.level === "2" ? (
      <h2 contentEditable={isLoggedin} style={headerStyling}>
        {content}
      </h2>
    ) : (
      <h3 contentEditable={isLoggedin} style={headerStyling}>
        {content}
      </h3>
    );

  return (
    <div className="section-title" style={divStyling}>
      {heading}
    </div>
  );
}

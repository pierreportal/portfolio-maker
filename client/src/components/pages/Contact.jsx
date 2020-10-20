import React, { useState } from "react";

export default function Contact(props) {
  const { content, style } = props;
  return (
    <>
      <div className={`feed-container col`} {...style}>
        {content}
      </div>
    </>
  );
}

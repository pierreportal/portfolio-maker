import React, { useState } from "react";

export default function Switch(props) {
  const { activate, action, label } = props;

  const [active, setActive] = useState(activate);

  const handleClick = () => {
    setActive(!active);
    action();
  };

  return (
    <div className="editor-switch-component">
      <div
        className={`editor-button-switch-container ${
          active ? "activated" : ""
        }`}
        onClick={handleClick}
      >
        <div className="editor-button-switch-inner"></div>
      </div>
      <div className="editor-button-switch-label">{label}</div>
    </div>
  );
}

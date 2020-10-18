import React, { useState } from "react";

export default function Dropdown(props) {
  const { options, label, selectedOption, action } = props;

  const [selected, setSelected] = useState(selectedOption);
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);
  const select = (option) => {
    setSelected(option);
    action(option);
  };

  const list = ["default", ...options].map((option) => (
    <div
      onClick={() => select(option)}
      className={`editor-button-dropdown-item ${
        option === selected ? "selected" : ""
      }`}
      key={option}
      style={{ fontFamily: `${option}` }}
    >
      {option}
    </div>
  ));

  return (
    <div className="editor-dropdown-component row">
      <div className="editor-button-dropdown-label">{label}</div>
      <div className={`editor-button-dropdown-container`} onClick={handleClick}>
        <span style={{ fontFamily: `${selected}` }}> {selected}</span>
        {open && <div className="editor-button-dropdown-list">{list}</div>}
      </div>
    </div>
  );
}

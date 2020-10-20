import React, { useState } from "react";

export default function ColorPalette(props) {
  const { options, label, selectedOption, action } = props;

  const [selected, setSelected] = useState(selectedOption);
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);
  const select = (option) => {
    setSelected(option);
    action(option);
  };

  const list = options.map((option) => (
    <div
      onClick={() => select(option)}
      className={`editor-button-colorpalette-item ${
        option === selected ? "selected" : ""
      }`}
      key={option}
      style={{ backgroundColor: `${option}` }}
    ></div>
  ));

  return (
    <div className="editor-colorpalette-component row">
      <div className="editor-button-colorpalette-label">{label}</div>
      <div
        className={`editor-button-colorpalette-container`}
        onClick={handleClick}
        style={{ backgroundColor: `${selected}` }}
      >
        {open && <div className="editor-button-colorpalette-list">{list}</div>}
      </div>
    </div>
  );
}

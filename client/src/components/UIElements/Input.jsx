import React, { useState } from "react";

export default function Input(props) {
  const { value, label, action } = props;

  const [color, setColor] = useState(value);

  const changeColor = () => {
    action(color);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setColor(value);
  };

  return (
    <div className="row">
      <div>{label}</div>
      <input
        type="text"
        value={color}
        onBlur={changeColor}
        onChange={handleChange}
      />
    </div>
  );
}

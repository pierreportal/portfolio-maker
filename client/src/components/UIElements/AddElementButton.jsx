import React, { useState } from "react";

export default function AddElementButton(props) {
  const { options, action, placeHolder } = props;
  const [showOptionEditor, setShowOptionEditor] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const handleClick = () => setShowOptionEditor(!showOptionEditor);

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
    action(inputValue);
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleBlur = () => setShowOptionEditor(false);

  return (
    <div className={`add-element-button ${showOptionEditor && "open"} row`}>
      {showOptionEditor && (
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder={placeHolder}
            value={inputValue}
            autoFocus={true}
            onBlur={handleBlur}
          />
        </form>
      )}
      <div className="add-element-button-plus" onClick={handleClick}>
        +
      </div>
    </div>
  );
}

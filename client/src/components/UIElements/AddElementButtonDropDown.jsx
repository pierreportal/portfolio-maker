import React, { useState } from "react";

export default function AddElementButton(props) {
  const { action, options } = props;
  const [showOptionEditor, setShowOptionEditor] = useState(false);

  //   const [inputValue, setInputValue] = useState("");

  const handleClick = () => setShowOptionEditor(!showOptionEditor);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setInputValue("");
  //     action(inputValue);
  //   };
  //   const handleChange = (e) => {
  //     const { value } = e.target;
  //     setInputValue(value);
  //   };

  const selectItem = (item) => action(item);

  const listOfOptions = options.map((o) => (
    <li onClick={() => selectItem(o)} key={o}>
      {o}
    </li>
  ));

  return (
    <div className={`add-element-button ${showOptionEditor && "open"} row`}>
      {showOptionEditor && (
        <div className="add-element-button-dropdown-container">
          <ul>{listOfOptions}</ul>
        </div>
      )}
      <div className="add-element-button-plus" onClick={handleClick}>
        +
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function ModuleListItem(props) {
  const { elem, editModule, deleteModule } = props;
  const { type, label } = elem;

  const tradDict = {
    nCols: "Number of columns",
    boxSizes: "Grid template",
    rowHeight: "Height of rows",
    gridGap: "Gap",
  };

  const [savedParams, setSavedParams] = useState(elem.params);
  const [savedStyle, setSavedStyle] = useState(elem.style);

  const modify = () => {
    editModule(elem.id, savedParams, savedStyle);
  };
  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setSavedStyle({ ...savedStyle, [name]: value });
  };
  const handleParamsChange = (e) => {
    const { name, value } = e.target;
    setSavedParams({ ...savedParams, [name]: value });
  };
  const handleKeys = (e) => {
    if (e.keyCode === 13) return modify();
  };

  const paramsPanel =
    savedParams &&
    Object.keys(savedParams).map(
      (k) =>
        k !== "boxSizes" && (
          <li>
            {tradDict[k] ? tradDict[k] : k}:{" "}
            <input
              type="text"
              value={savedParams[k]}
              onKeyDown={handleKeys}
              onChange={handleParamsChange}
              onBlur={modify}
              name={k}
            />
          </li>
        )
    );

  const stylePanel =
    savedStyle &&
    Object.keys(savedStyle).map((k) => (
      <li>
        {tradDict[k] ? tradDict[k] : k}:{" "}
        <input
          type="text"
          value={savedStyle[k]}
          onKeyDown={handleKeys}
          onChange={handleStyleChange}
          onBlur={modify}
          name={k}
        />
      </li>
    ));

  const colorDisct = {
    sectionTitle: "lightcoral",
    grid: "darkcyan",
    textComponent: "dodgerblue",
    collumn: "orange",
  };

  const [showSettings, setShowSettings] = useState(false);

  const displaySettings = () => setShowSettings(!showSettings);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
    } else deleteModule(elem);
  };
  const abortConfirm = () => {
    setDeleteConfirm(false);
  };

  return (
    <>
      <div className="module-list-item" style={{ color: colorDisct[type] }}>
        <button onClick={displaySettings}>s</button>
        {label}
        <button
          className={deleteConfirm ? "confirm-delete" : ""}
          onClick={handleDelete}
          onMouseLeave={abortConfirm}
        >
          {deleteConfirm ? "delete" : "x"}
        </button>
      </div>
      {showSettings && (
        <div className={`module-list-item-settings`}>
          <ul className="settings-list">{paramsPanel}</ul>
          <ul className="settings-list">{stylePanel}</ul>
        </div>
      )}
    </>
  );
}

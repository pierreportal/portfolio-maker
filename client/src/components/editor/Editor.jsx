import React, { useState, useEffect } from "react";
import ModuleListItem from "./ModuleListItem";
import Switch from "../UIElements/Switch";
import Dropdown from "../UIElements/Dropdown";
import Input from "../UIElements/Input";

export default function SideBar(props) {
  const { buildTemplate, isLoggedin, templateModules } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [modules, setModules] = useState(templateModules);
  const [sideBarActive, setSideBarActive] = useState(props.sideBarState);
  const [headMenuActive, setHeadMenuActive] = useState(props.headMenuState);
  const [bgColor, setBgColor] = useState(props.bgColorState);
  const [headingDefaultMargin, setHeadingDefaultMargin] = useState(
    props.stateOfheadingDefaultMargin
  );

  const changeBgColor = (color) => {
    props.changeBgColor(color);
    setBgColor(color);
  };
  const toggleHeadMenu = () => {
    props.toggleHeadMenu(!headMenuActive);
    setHeadMenuActive(!headMenuActive);
  };
  const toggleSideBar = () => {
    props.toggleSideBar(!sideBarActive);
    setSideBarActive(!sideBarActive);
  };
  const toggleHeadingDefaultMargin = () => {
    props.toggleHeadingDefaultMargin(!headingDefaultMargin);
    setHeadingDefaultMargin(!headingDefaultMargin);
  };

  useEffect(() => buildTemplate(modules), [modules]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const editModule = (id, newParams, newStyle) => {
    const editedListOfModule = [...modules].map((module) => {
      return module.id === id
        ? { ...module, style: { ...newStyle }, params: { ...newParams } }
        : module;
    });
    setModules(editedListOfModule);
  };
  const deleteModule = (elem) => {
    const editedListOfModule = [...modules].filter((module) => {
      return module.id !== elem.id;
    });
    setModules(editedListOfModule);
  };

  const listOfInsertedModules = modules.map((module) => (
    <li>
      <ModuleListItem
        key={module.id}
        elem={module}
        editModule={editModule}
        deleteModule={deleteModule}
      />
    </li>
  ));

  //   const toggleDarkTheme = () => {};

  const setFont = (font) => props.setFont(font);

  const savedHeadMenuStyle = {
    textAlign: "left",
    justifyContent: "space-between",
    background: true,
    backgroundColor: "#fff",
  };

  const headMenuStylePanel =
    savedHeadMenuStyle &&
    Object.keys(savedHeadMenuStyle).map((k) => (
      <li>
        {k}: <input type="text" value={savedHeadMenuStyle[k]} name={k} />
      </li>
    ));

  return (
    <>
      {isLoggedin && (
        <div className={`dashboard-editor ${!isOpen ? "hidden" : ""} col`}>
          <button onClick={toggleOpen} className="editor-close-button">
            {isOpen ? "close" : "edit"}
          </button>

          <div className="editor-settings-container col">
            {/* MAIN STYLE */}
            <h4>general styling</h4>

            <Input value={bgColor} label={"BG Color"} action={changeBgColor} />

            <Dropdown
              options={["arial", "helvetica", "courier", "futura", "impact"]}
              label={"font"}
              selectedOption={props.selectedFont}
              action={setFont}
            />

            <Switch
              activate={headingDefaultMargin}
              action={toggleHeadingDefaultMargin}
              label={"Heading default margin"}
            />

            {/* NAVIGATION */}
            <h4>navigation</h4>

            <div className="row">
              <Switch
                activate={headMenuActive}
                action={toggleHeadMenu}
                label={"Header menu"}
              />
            </div>
            {headMenuActive && (
              <>
                <div className={`module-list-item-settings`}>
                  <ul className="settings-list">{headMenuStylePanel}</ul>
                </div>
              </>
            )}

            <div className="row">
              <Switch
                activate={sideBarActive}
                action={toggleSideBar}
                label={"Sidebar"}
              />
            </div>

            {/* FEED */}
            <h4>manage feeds</h4>
            {/* <p>You don't have any feed settup yet.</p> */}
            <button className="add-new-module-in-lidt-button">
              Create a new feed
            </button>
            {/* TEMPLATE */}
            <h4>main content template</h4>
            <ul>
              {listOfInsertedModules}
              <li className="add-new-module-in-lidt-button">
                add another module
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import defaultSettings from "../../defaultTemplateSettings.json";
import ModuleListItem from "./ModuleListItem";
import Switch from "../UIElements/Switch";
import Dropdown from "../UIElements/Dropdown";
import ColorPalette from "../UIElements/ColorPalette";
import { NavLink } from "react-router-dom";
import { getAllTemplates, getAllFeeds } from "../../api";

export default function Editor(props) {
  const { buildTemplate, isLoggedin, testUserSetting } = props;

  const {
    routes,
    headMenu,
    sidebar,
    headingDefaultMargin,
    bgColor,
    siteTitle,
    font,
  } = testUserSetting;

  const stylizeTemplateModules = (listOfTemplates) => {
    return listOfTemplates.map((x) => ({
      ...x,
      style: x.style || defaultSettings[x.type].style,
      params: x.params || defaultSettings[x.type].params,
    }));
  };
  // GET COMPONENTS
  const [templateFromDB, setTemplateFromDB] = useState([]);
  const [feedFromDB, setFeedFromDB] = useState({});

  useEffect(() => {
    getAllFeeds().then((data) => setFeedFromDB({ posts: data }));
  }, []);

  useEffect(() => {
    getAllTemplates().then((data) => {
      const dict = {};
      data.forEach((template) => {
        dict[template.name] = stylizeTemplateModules(template.modules);
      });
      setTemplateFromDB(dict);
    });
  }, [feedFromDB]);

  const [isOpen, setIsOpen] = useState(false);

  const [sideBarActive, setSideBarActive] = useState(sidebar);
  const [headMenuActive, setHeadMenuActive] = useState(headMenu);
  const [stateBgColor, setBgColor] = useState(bgColor);
  const [stateHeadingDefaultMargin, setHeadingDefaultMargin] = useState(
    headingDefaultMargin
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
    props.toggleHeadingDefaultMargin(!stateHeadingDefaultMargin);
    setHeadingDefaultMargin(!stateHeadingDefaultMargin);
  };
  const toggleOpen = () => setIsOpen(!isOpen);

  // {
  //   [name]: [modules],
  //   [name]: [modules],
  // }

  // const [modules, setModules] = useState(templateFromDB);

  const editModule = (id, newParams, newStyle) => {
    const editedListOfModule = [...templateFromDB].map((module) => {
      return module.id === id
        ? { ...module, style: { ...newStyle }, params: { ...newParams } }
        : module;
    });
    // setModules(editedListOfModule);
  };
  const deleteModule = (elem) => {
    const editedListOfModule = [...templateFromDB].filter((module) => {
      return module.id !== elem.id;
    });
    // setModules(editedListOfModule);
  };

  const listOfInsertedModules = Object.entries(templateFromDB).map((obj) => {
    const [name, modules] = obj;
    return {
      templateName: name,
      modulesList: [...modules].map((module) => (
        <li>
          <ModuleListItem
            key={module.orderIndex}
            elem={module}
            editModule={editModule}
            deleteModule={deleteModule}
          />
        </li>
      )),
    };
  });

  const TEMPLATES =
    listOfInsertedModules.length &&
    listOfInsertedModules.map((M) => {
      return (
        <>
          <h4>{M.templateName}</h4>
          <ul>{M.modulesList}</ul>
        </>
      );
    });

  const setFont = (font) => props.setFont(font);

  return (
    <>
      {isLoggedin && (
        <div className={`dashboard-editor ${!isOpen ? "hidden" : ""} col`}>
          <button onClick={toggleOpen} className="editor-close-button">
            {isOpen ? "close" : "edit"}
          </button>

          <div className="editor-settings-container col">
            <h4>general styling</h4>
            <ColorPalette
              options={defaultSettings.availableColors}
              label={"BG Color"}
              selectedOption={stateBgColor}
              action={changeBgColor}
            />
            <Dropdown
              options={defaultSettings.availableFonts}
              label={"font"}
              selectedOption={font}
              action={setFont}
            />
            <Switch
              activate={stateHeadingDefaultMargin}
              action={toggleHeadingDefaultMargin}
              label={"Heading default margin"}
            />

            <h4>navigation</h4>
            <div className="row">
              <Switch
                activate={headMenuActive}
                action={toggleHeadMenu}
                label={"Header menu"}
              />
            </div>
            <div className="row">
              <Switch
                activate={sideBarActive}
                action={toggleSideBar}
                label={"Sidebar"}
              />
            </div>

            <h4>manage feeds</h4>
            <button className="add-new-module-in-lidt-button">
              Create a new feed
            </button>
            <h4>main content template</h4>
            {TEMPLATES}
            <div className="add-new-module-in-lidt-button">
              add another module
            </div>
          </div>
        </div>
      )}
    </>
  );
}

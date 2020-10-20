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

  const stylizeTemplateModules = (listOfTemplates) => {
    return listOfTemplates.map((x) => ({
      ...x,
      style: x.style || defaultSettings[x.type].style,
      params: x.params || defaultSettings[x.type].params,
    }));
  };
  // GET COMPONENTS
  const [modularTemplate, setModularTemplate] = useState([]);
  const [templateFromDB, setTemplateFromDB] = useState([]);
  const [feedFromDB, setFeedFromDB] = useState({}); // No feed on daqshboard

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
  const toggleOpen = () => setIsOpen(!isOpen);

  // {
  //   [name]: [modules],
  //   [name]: [modules],
  // }

  const [modules, setModules] = useState(templateFromDB);

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
  // useEffect(() => buildTemplate(modules), [modules]);

  // return <h1>HH</h1>;

  // {
  //   posts: [posts]
  // }

  // const listOfFeeds =
  //   feedFromDB.posts &&
  //   feedFromDB.posts.map((feed) => (
  //     <NavLink
  //       className="manage-feed-button"
  //       activeClassName="active"
  //       exact
  //       to={`/manager/${feed.feedName}`}
  //     >
  //       {feed.feedName}
  //     </NavLink>
  //   ));

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
              options={[
                "lightgreen",
                "blue",
                "yellow",
                "white",
                "red",
                "pink",
                "coral",
              ]}
              label={"BG Color"}
              selectedOption={bgColor}
              action={changeBgColor}
            />
            <Dropdown
              options={[
                "arial",
                "helvetica",
                "courier",
                "futura",
                "impact",
                "times",
              ]}
              label={"font"}
              selectedOption={props.selectedFont}
              action={setFont}
            />

            <Switch
              activate={headingDefaultMargin}
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

            <h4>manage feeds</h4>
            {/* {listOfFeeds} */}
            <button className="add-new-module-in-lidt-button">
              Create a new feed
            </button>
            <h4>main content template</h4>
            <ul>
              {listOfInsertedModules.length &&
                listOfInsertedModules.map((M) => {
                  return (
                    <>
                      <h4>{M.templateName}</h4>
                      {M.modulesList}
                    </>
                  );
                })}

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

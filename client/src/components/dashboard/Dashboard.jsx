import React, { useState } from "react";
import HeadMenu from "./HeadMenu";
import GridTemplate from "./GridTemplate";
import SideBar from "./SideBar";
import Editor from "../editor/Editor";
import SectionTitle from "./SectionTitle";
import TextComponent from "./TextComponent";
import TextGridTemplate from "./TextGridTemplate";
import defaultSettings from "../../defaultTemplateSettings.json";
import AliceRollMenu from "../specials/AN/AliceRollMenu";
import FloatHeader from "../specials/AN/FloatHeader";
import routes from "../../routes/AN/settings.json";
import data from "../../fakeDB.json";

const { feeds, templateModuleList } = data;

const mainPosts = feeds.find((x) => x.name === "mainposts").posts;

const mainPageTemplate = templateModuleList.find((x) => x.name === "main")
  .template;

const feedManager = {
  mainPage: mainPosts,
};

const testUserSetting = {
  font: "default",
  bgColor: "lightgreen",
  headMenu: false,
  sideBar: false,
  headingDefaultMargin: false,
};

const styledTemplateModuleList = mainPageTemplate.map((x) => ({
  ...x,
  style: defaultSettings.style[x.type],
}));

export default function Dashboard(props) {
  const { isLoggedin } = props;
  const [addSideBar, setAddSideBar] = useState(testUserSetting.sideBar);
  const [addHeadMenu, setAddHeadMenu] = useState(testUserSetting.headMenu);
  const [templateFont, setTemplateFont] = useState(testUserSetting.font);
  const [templateBgColor, setTemplateBgColor] = useState(
    testUserSetting.bgColor
  );
  const [modularTemplate, setModularTemplate] = useState([]);
  const [headingDefaultMargin, setHeadingDefaultMargin] = useState(
    testUserSetting.headingDefaultMargin
  );
  const changeBgColor = (color) => setTemplateBgColor(color);
  const setFont = (font) => setTemplateFont(font);
  const toggleSideBar = () => setAddSideBar(!addSideBar);
  const toggleHeadMenu = () => setAddHeadMenu(!addHeadMenu);
  const toggleHeadingDefaultMargin = () =>
    setHeadingDefaultMargin(!headingDefaultMargin);

  const buildTemplate = (modules) => {
    const list = modules.map((module, i) => {
      return module.type === "grid" ? (
        <GridTemplate
          isLoggedin={isLoggedin}
          key={i}
          feed={feedManager.mainPage}
          params={module.params}
          style={module.style}
        />
      ) : module.type === "collumn" ? (
        <TextGridTemplate
          isLoggedin={isLoggedin}
          key={i}
          params={module.params}
          style={module.style}
          heading={true}
          content={true}
        />
      ) : module.type === "aliceRollMenu" ? (
        <AliceRollMenu
          isLoggedin={isLoggedin}
          key={i}
          style={module.style}
          navigationRoutes={routes.rollingMenu}
        />
      ) : module.type === "sectionTitle" ? (
        <SectionTitle
          isLoggedin={isLoggedin}
          key={i}
          content={module.content}
          params={module.params}
          style={module.style}
        />
      ) : module.type === "floatHeader" ? (
        <FloatHeader
          isLoggedin={isLoggedin}
          key={i}
          style={module.style}
          navigationRoutes={routes.headMenu}
        />
      ) : (
        <TextComponent
          isLoggedin={isLoggedin}
          key={i}
          content={module.content}
          params={module.params}
          style={module.style}
        />
      );
    });
    setModularTemplate(list);
  };

  const fullSized = {
    style: !addHeadMenu
      ? { height: "100vh" }
      : { height: "calc(100vh - 3rem)" },
  };

  const fontStyle = {
    style: { fontFamily: templateFont, backgroundColor: templateBgColor },
  };

  return (
    <div className="row fullsize">
      <div
        className={`col fullsize ${
          !headingDefaultMargin ? "no-heading-margin" : ""
        }`}
        {...fontStyle}
      >
        {addHeadMenu && <HeadMenu isLoggedin={isLoggedin} />}
        <div className="row fullsize">
          {addSideBar && <SideBar isLoggedin={isLoggedin} />}
          <div className={`feed-container col`} {...fullSized}>
            {modularTemplate}
          </div>
        </div>
      </div>

      <Editor
        isLoggedin={isLoggedin}
        buildTemplate={buildTemplate}
        templateModules={styledTemplateModuleList}
        toggleSideBar={toggleSideBar}
        sideBarState={addSideBar}
        headMenuState={addHeadMenu}
        toggleHeadMenu={toggleHeadMenu}
        setFont={setFont}
        toggleHeadingDefaultMargin={toggleHeadingDefaultMargin}
        stateOfheadingDefaultMargin={headingDefaultMargin}
        selectedFont={templateFont}
        bgColorState={templateBgColor}
        changeBgColor={changeBgColor}
      />
    </div>
  );
}

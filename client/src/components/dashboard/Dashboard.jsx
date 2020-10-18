import React, { useState } from "react";
import HeadMenu from "./HeadMenu";
import GridTemplate from "./GridTemplate";
import SideBar from "./SideBar";
import Editor from "../editor/Editor";
import SectionTitle from "./SectionTitle";
import TextComponent from "./TextComponent";
import TextGridTemplate from "./TextGridTemplate";
import defaultSettings from "../../defaultTemplateSettings.json";
import data from "../../fakeDB.json";

const { posts } = data;

const testUserSetting = {
  font: "default",
  headMenu: false,
  sideBar: true,
  headingDefaultMargin: true,
};

const templateModuleList = [
  {
    id: `${Math.random() * 10 ** 10}`,
    type: "sectionTitle",
    label: "Section Title",
    content: "Latest Work",
    style: defaultSettings.style.defaultSectionTitleStyling,
    params: { level: "1" },
  },
  {
    id: `${Math.random() * 10 ** 10}`,
    type: "sectionTitle",
    label: "Section Title",
    content: "The Ghost in the Machine ~ Japan 2019",
    style: defaultSettings.style.defaultSectionTitleStyling,
    params: { level: "2" },
  },

  {
    id: `${Math.random() * 10 ** 10}`,
    type: "grid",
    label: "Grid",
    style: defaultSettings.style.defaultGridStyling,
    params: {
      feed: posts,
      nCols: 5,
      boxSizes: [
        { width: 3, height: 1 },
        { width: 2, height: 1 },
        { width: 1, height: 1 },
        { width: 3, height: 1 },
      ],
      rowHeight: "25rem",
    },
  },
  {
    id: `${Math.random() * 10 ** 10}`,
    type: "sectionTitle",
    label: "Section Title",
    content: "This is the second section",
    style: defaultSettings.style.defaultSectionTitleStyling,
    params: { level: "3" },
  },
  {
    id: `${Math.random() * 10 ** 10}`,
    type: "textComponent",
    label: "Text Paragraph",
    content:
      "this is an example of long text Charles-Pierre Baudelaire war ein französischer Schriftsteller und einer der bedeutendsten Lyriker der französischen Sprache. Er ist vor allem durch seine Gedichtsammlung Les Fleurs du Mal bekannt geworden und gilt als wichtiger Wegbereiter der literarischen",
    style: defaultSettings.style.defaultTextComponentStyling,
  },
  {
    id: `${Math.random() * 10 ** 10}`,
    type: "textComponent",
    label: "Text Paragraph",
    content:
      "this is an example of long text Charles-Pierre Baudelaire war französischen Sprache. Er ist vor allem durch seine Gedichtsammlung Les Fleurs du Mal bekannt geworden und gilt als wichtiger Wegbereiter der literarischen",
    style: defaultSettings.style.defaultTextComponentStyling,
  },
  {
    id: `${Math.random() * 10 ** 10}`,
    type: "collumn",
    label: "Text Collumns",
    style: defaultSettings.style.defaultGridStyling,
    params: {
      nCols: 2,
      boxSizes: [],
      rowHeight: "auto",
    },
  },
];

export default function Dashboard(props) {
  const { isLoggedin } = props;
  const [addSideBar, setAddSideBar] = useState(testUserSetting.sideBar);
  const [addHeadMenu, setAddHeadMenu] = useState(testUserSetting.headMenu);
  const [templateFont, setTemplateFont] = useState(testUserSetting.font);
  const [modularTemplate, setModularTemplate] = useState([]);
  const [headingDefaultMargin, setHeadingDefaultMargin] = useState(
    testUserSetting.headingDefaultMargin
  );
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
          feed={module.params.feed}
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
      ) : module.type === "sectionTitle" ? (
        <SectionTitle
          isLoggedin={isLoggedin}
          key={i}
          content={module.content}
          params={module.params}
          style={module.style}
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

  const fontStyle =
    templateFont !== "default" ? { style: { fontFamily: templateFont } } : {};

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
        templateModules={templateModuleList}
        toggleSideBar={toggleSideBar}
        sideBarState={addSideBar}
        headMenuState={addHeadMenu}
        toggleHeadMenu={toggleHeadMenu}
        setFont={setFont}
        toggleHeadingDefaultMargin={toggleHeadingDefaultMargin}
        stateOfheadingDefaultMargin={headingDefaultMargin}
        selectedFont={templateFont}
      />
    </div>
  );
}

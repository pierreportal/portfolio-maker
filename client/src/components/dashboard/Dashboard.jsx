import React, { useState, useEffect } from "react";
import HeadMenu from "./HeadMenu";
import SideBar from "./SideBar";
// import Editor from "../editor/Editor";
import Routing from "../Routing";
import { getTemplate } from "../../api";
import {
  generateComponent,
  styledTemplateModule,
} from "../../component-generator";
// import startedKidTemplateData from "../../starterKitData.json";

export default function Dashboard(props) {
  const { isLoggedin, testUserSetting, user, routes } = props;
  // GET COMPONENTS
  const [modularTemplate, setModularTemplate] = useState();
  const [templateFromDB, setTemplateFromDB] = useState();
  const [feedFromDB, setFeedFromDB] = useState(); // No feed on daqshboard
  // useEffect(
  //   () =>
  //     getTemplate("constant").then(
  //       (data) => data && setTemplateFromDB(data.modules)
  //     ),
  //   []
  // );

  useEffect(() => {
    async function fetchData() {
      await getTemplate("constant").then(
        (data) => data && setTemplateFromDB(data.modules)
      );
    }
    fetchData();
  }, []);

  const buildTemplate = (modules) => {
    const list =
      modules &&
      modules.map((module, i) => {
        return generateComponent(
          i,
          isLoggedin,
          styledTemplateModule(module),
          feedFromDB,
          testUserSetting,
          user
        );
      });
    setModularTemplate(list);
  };
  useEffect(() => console.log(templateFromDB), [templateFromDB]);
  useEffect(() => buildTemplate(templateFromDB), [templateFromDB]);
  // END GET COMPONENTS

  // DEFAULT STYLING TUNING
  const [addSideBar, setAddSideBar] = useState(testUserSetting.sideBar);
  const [addHeadMenu, setAddHeadMenu] = useState(testUserSetting.headMenu);
  const [templateFont, setTemplateFont] = useState(testUserSetting.font);
  const [templateBgColor, setTemplateBgColor] = useState(
    testUserSetting.bgColor
  );
  const [headingDefaultMargin, setHeadingDefaultMargin] = useState(
    testUserSetting.headingDefaultMargin
  );

  const fullSized = {
    style: !addHeadMenu
      ? { height: "100vh" }
      : { height: "calc(100vh - 3rem)" },
  };
  const fontStyle = {
    style: {
      fontFamily: templateFont,
      backgroundColor: templateBgColor,
    },
  };
  // END DEFAULT STYLING TUNING

  return (
    testUserSetting && (
      <div className="row fullsize containoverflow">
        <div
          className={`contentManager col fullsize ${
            !headingDefaultMargin && "no-heading-margin"
          }`}
          {...fontStyle}
        >
          {addHeadMenu && (
            <HeadMenu
              isLoggedin={isLoggedin}
              user={user}
              testUserSetting={testUserSetting}
            />
          )}
          <div className="row fullsize">
            {addSideBar && (
              <SideBar
                isLoggedin={isLoggedin}
                testUserSetting={testUserSetting}
              />
            )}

            <div className={`feed-container col`} {...fullSized}>
              {modularTemplate}
              <Routing
                isLoggedin={isLoggedin}
                user={user}
                testUserSetting={testUserSetting}
                routes={routes}
              />
            </div>
          </div>
        </div>

        {/* <Editor
          testUserSetting={testUserSetting}
          isLoggedin={isLoggedin}
          buildTemplate={buildTemplate}
          toggleSideBar={toggleSideBar}
          toggleHeadMenu={toggleHeadMenu}
          setFont={setFont}
          toggleHeadingDefaultMargin={toggleHeadingDefaultMargin}
          changeBgColor={changeBgColor}
        /> */}
      </div>
    )
  );
}

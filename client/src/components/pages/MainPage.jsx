import React, { useState, useEffect } from "react";
import { getTemplate, getFeed } from "../../api";
import {
  generateComponent,
  styledTemplateModule,
} from "../../component-generator";
import startedKidTemplateData from "../../starterKitData.json";

export default function MainPage(props) {
  const { isLoggedin, user, testUserSetting, feedName, templateName } = props;
  // GET COMPONENTS
  const [modularTemplate, setModularTemplate] = useState([]);
  const [templateFromDB, setTemplateFromDB] = useState([]);
  const [feedFromDB, setFeedFromDB] = useState({ posts: [] });

  useEffect(() => {
    getFeed(feedName).then((data) => setFeedFromDB({ posts: data }));
  }, []);

  useEffect(() => {
    getTemplate(templateName).then(
      (data) => data && setTemplateFromDB(data.modules)
    );
  }, [feedFromDB]);

  useEffect(() => console.log(templateFromDB), [templateFromDB]);

  const buildTemplate = (modules) => {
    const list =
      modules &&
      modules.map((module, i) => {
        return (
          <>
            {generateComponent(
              i,
              isLoggedin,
              styledTemplateModule(module),
              feedFromDB,
              testUserSetting,
              user
            )}
          </>
        );
      });
    setModularTemplate(list);
  };

  useEffect(() => buildTemplate(templateFromDB), [templateFromDB]);
  // END GET COMPONENTS

  return (
    <>
      {modularTemplate.length ? (
        modularTemplate
      ) : (
        <div
          className={`new-page-placeholder ${
            testUserSetting.sideBar && `has-sidebar`
          }`}
        >
          Start right here
        </div>
      )}
    </>
  );
}

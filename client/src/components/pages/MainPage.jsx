import React, { useState, useEffect } from "react";
import {
  generateComponent,
  styledTemplateModule,
} from "../../component-generator";
import { getTemplate, getFeed } from "../../api";

export default function MainPage(props) {
  const {
    isLoggedin,
    user,
    testUserSetting,
    routes,
    feedName,
    templateName,
  } = props;
  // GET COMPONENTS
  const [modularTemplate, setModularTemplate] = useState([]);
  const [templateFromDB, setTemplateFromDB] = useState([]);
  const [feedFromDB, setFeedFromDB] = useState({ posts: [] });
  useEffect(() => {
    getFeed(feedName).then((data) => setFeedFromDB({ posts: data }));
  }, []);
  useEffect(() => {
    getTemplate(templateName).then((data) => setTemplateFromDB(data.modules));
  }, [feedFromDB]);

  const buildTemplate = (modules) => {
    const list =
      modules &&
      modules.map((module, i) => {
        return generateComponent(
          i,
          isLoggedin,
          styledTemplateModule(module),
          feedFromDB,
          routes,
          testUserSetting,
          user
        );
      });
    setModularTemplate(list);
  };

  useEffect(() => buildTemplate(templateFromDB), [templateFromDB]);
  // END GET COMPONENTS

  return <>{modularTemplate}</>;
}

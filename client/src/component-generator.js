import GridTemplate from "./components/dashboard/GridTemplate";
import SectionTitle from "./components/dashboard/SectionTitle";
import TextComponent from "./components/dashboard/TextComponent";
import TextGridTemplate from "./components/dashboard/TextGridTemplate";
import AliceRollMenu from "./components/specials/AN/AliceRollMenu";
import FloatHeader from "./components/specials/AN/FloatHeader";
import defaultSettings from "./defaultTemplateSettings.json";

import React from "react";

export const generateComponent = (
  i,
  isLoggedin,
  module,
  feedManager,
  routes,
  testUserSetting,
  user
) => {
  return module.type === "grid" && feedManager.posts ? (
    <GridTemplate
      isLoggedin={isLoggedin}
      key={i}
      feed={feedManager.posts}
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
      // navigationRoutes={routes.rollingMenu}
      text={module.text}
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
      navigationRoutes={"headMenu"}
      languages={testUserSetting.languages}
      user={user}
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
};

export const styledTemplateModule = (module) => {
  return {
    ...module,
    style: module.style || defaultSettings[module.type].style,
    params: module.params || defaultSettings[module.type].params,
  };
};

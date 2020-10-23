import React, { useEffect, useState } from "react";
import GridTemplate from "./components/dashboard/GridTemplate";
import SectionTitle from "./components/dashboard/SectionTitle";
import TextComponent from "./components/dashboard/TextComponent";
import TextGridTemplate from "./components/dashboard/TextGridTemplate";
import AliceRollMenu from "./components/specials/AN/AliceRollMenu";
import FloatHeader from "./components/specials/AN/FloatHeader";
import defaultSettings from "./defaultTemplateSettings.json";

export const generateComponent = (
  i,
  isLoggedin,
  module,
  feedManager,
  testUserSetting,
  user
) => {
  // const [displayEditOptions, setDisplayEditOptions] = useState(false);
  // const closeEditMenu = () => setDisplayEditOptions(false);
  // const handleClickToEdit = (event) => {
  //   if (!isLoggedin) return;
  //   setDisplayEditOptions(true);
  // };
  // useEffect(() => console.log(displayEditOptions), [displayEditOptions]);
  const component =
    module.type === "grid" && feedManager.posts ? (
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
        testUserSetting={testUserSetting}
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
  return (
    // <div
    //   className={isLoggedin && "testHOverScale"}
    //   onClick={(e) => handleClickToEdit(e)}
    //   onMouseLeave={closeEditMenu}
    // >
    <> {component}</>
    // </div>
  );
};

export const styledTemplateModule = (module) => {
  return {
    ...module,
    style: module.style || defaultSettings[module.type].style,
    params: module.params || defaultSettings[module.type].params,
  };
};

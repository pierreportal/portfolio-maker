import React, { useState } from "react";
import Navigation from "../../Navigation";

export default function FloatHeader(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => setOpenMenu(!openMenu);

  const { style, languages } = props;

  // const navLabels = navigationRoutes.map((x) => <li key={x}>{x.label}</li>);

  const [language, setLanguage] = useState(navigator.language);

  const langs = languages.map((l) =>
    l === language ? (
      <span className="selectedLanguage">{l}</span>
    ) : (
      <span className="non-selectedLanguage">{l}</span>
    )
  );

  return (
    <>
      <div className="col" style={{ width: style.width, margin: style.margin }}>
        <div className="floatHeader row" style={style}>
          <div className="logo"></div>

          <div className="menu-button" onClick={handleClick}>
            {openMenu ? "CLOSE" : "MENU"}
          </div>
        </div>
        {openMenu && (
          <div className="floatHeader menu">
            <ul>
              <Navigation testUserSetting={props.testUserSetting} />
              <li>{langs}</li>
            </ul>
          </div>
        )}
      </div>
      <div className="floatHeader-helpermargin"></div>
    </>
  );
}

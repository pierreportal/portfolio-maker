import React, { useState } from "react";

export default function FloatHeader(props) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClick = () => setOpenMenu(!openMenu);
  const { style, navigationRoutes } = props;
  const navLabels = navigationRoutes.map((x) => <li key={x}>{x.label}</li>);
  return (
    <>
      <div className="col" style={{ width: style.width, margin: style.margin }}>
        <div className="floatHeader row" style={style}>
          <div>ALICE NEUVILLE</div>
          <div className="menu-button" onClick={handleClick}>
            {openMenu ? "CLOSE" : "MENU"}
          </div>
        </div>
        {openMenu && (
          <div className="floatHeader menu">
            <ul>
              {navLabels}
              <li>fr/en</li>
            </ul>
          </div>
        )}
      </div>
      <div className="floatHeader-helpermargin"></div>
    </>
  );
}

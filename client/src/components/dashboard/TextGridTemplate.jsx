import React, { useState } from "react";
import { buildGrid } from "../../gridBuilder";

export default function TextGridTemplate(props) {
  const { isLoggedin, params, style, heading, content } = props;

  const nPosts = params.nCols;

  const gridCells = buildGrid(params, nPosts);

  const nRows = Math.max(...gridCells.map((x) => x.rowIndex + 1));

  const gridTemplate = {
    gridTemplateColumns: `repeat(${params.nCols}, 1fr)`,
    gridTemplateRows: `repeat(${nRows}, 1fr)`,
    gridGap: style.gridGap || ".6rem",
    width: style.width || "100%",
    margin: style.margin,
  };

  const postsList = [...Array(nPosts)].map((_, i) => {
    const col = gridCells[i].colIndex + 1;
    const row = gridCells[i].rowIndex + 1;
    return (
      <div
        style={{
          gridColumn: col,
          gridRow: row,
          height: params.rowHight,
        }}
      >
        {!!heading && <h4>This is a heading</h4>}
        {!!content && <p>This is the content...</p>}
      </div>
    );
  });

  return (
    <div className="dashboard-mainform col" style={{ padding: style.padding }}>
      <div className="grid" style={gridTemplate}>
        {postsList}
      </div>
    </div>
  );
}

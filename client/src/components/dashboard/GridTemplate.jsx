import React from "react";
import PostTemplate from "./PostTemplate";
import { buildGrid } from "../../gridBuilder";

export default function GridTemplate(props) {
  const { feed, params, style } = props;

  const gridCells = buildGrid(params, feed.length);

  const nRows = Math.max(...gridCells.map((x) => x.rowIndex + 1));

  const gridTemplate = {
    gridTemplateColumns: `repeat(${params.nCols}, 1fr)`,
    gridTemplateRows: `repeat(${nRows}, 1fr)`,
    gridGap: style.gridGap || ".6rem",
    width: style.width || "100%",
    margin: style.margin,
  };

  const postsList = feed.map((post, i) => {
    const col = gridCells[i].colIndex + 1;
    const row = gridCells[i].rowIndex + 1;
    return (
      <>
        <PostTemplate
          key={i}
          post={post}
          rowHight={params.rowHeight}
          index={i}
          col={col}
          width={col + gridCells[i].width}
          row={row}
          height={row + gridCells[i].height}
        />
      </>
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

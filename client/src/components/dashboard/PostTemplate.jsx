import React, { useState, useEffect } from "react";

export default function PostTemplate(props) {
  const { post, index, col, row, width, height, rowHight } = props;

  const colIndex = `${col}/${width}`;
  const rowIndex = `${row}/${height}`;

  return (
    <div
      className={post.img ? `dashboard-post` : `dashboard-text`}
      style={{
        gridColumn: colIndex,
        gridRow: rowIndex,
        height: rowHight,
      }}
    >
      {post.img && (
        <div
          className="post-img"
          style={{ backgroundImage: `url(${post.img})` }}
        ></div>
      )}
      {post.title && (
        <div className="text">
          <h2>
            {post.title} ~ {index}
          </h2>
          {!post.img && <p>{post.content}</p>}
        </div>
      )}
    </div>
  );
}

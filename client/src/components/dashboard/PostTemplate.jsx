import React, { useState, useEffect } from "react";

export default function PostTemplate(props) {
  const { post, index, col, row, width, height, rowHight } = props;

  const colIndex = `${col}/${width}`;
  const rowIndex = `${row}/${height}`;

  const handleClickOnVideo = (e) => {};

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
      {post.video && (
        <div className="post-img ">
          {/* className="" */}
          {post.title && (
            <div className="text on-video col" onClick={handleClickOnVideo}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          )}
          <iframe
            width="100%"
            height="100%"
            src={post.video}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
      {!post.video && post.title && (
        <div className="text col">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}

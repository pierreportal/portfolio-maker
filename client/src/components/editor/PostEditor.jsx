import React, { useState, useEffect } from "react";

export default function PostEditor(props) {
  const { post } = props;

  const [postState, setPostState] = useState({ ...post });

  return (
    <div className="feed-manager-post-editor row">
      {/* {(postState.title || postState.content) && ( */}
      <div className="col">
        <h3 className="title">{postState.title || ""}</h3>

        <div className="content">{postState.content || ""}</div>
      </div>
      {/* )} */}
      {postState.img && (
        <div className="col">
          <div
            className="img"
            style={{
              backgroundImage: `url(${postState.img})`,
              width: `100%`,
              height: `30rem`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
            }}
          ></div>
          {/* <div>{postState.img}</div> */}
        </div>
      )}
      {postState.video && (
        <div className="col" className="video">
          <iframe
            width="100%"
            height="300px"
            src={postState.video}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

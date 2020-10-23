import React, { useState, useEffect } from "react";

export default function NewPostForm(props) {
  return (
    <div>
      <div className="feed-manager-post-editor row">
        {/* {(postState.title || postState.content) && ( */}
        <div className="col">
          <h3 className="title"></h3>
          <div className="content"></div>
        </div>
        <div className="col">
          <button>upload image</button>
          <input type="text" placeholder="video URL" />
        </div>
      </div>
      {/* <button>post</button> */}
    </div>
  );
}

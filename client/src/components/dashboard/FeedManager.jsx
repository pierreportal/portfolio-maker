import React from "react";
import axios from "axios";

export default function FeedManager(props) {
  const { isLoggedin, feed } = props;
  const { posts, name } = feed;

  const postsList = posts.map((post) => {
    return (
      <div>
        <h2>{post.title || ""}</h2>
        <p>{post.content || ""}</p>
      </div>
    );
  });
  return (
    <div>
      <form action="post">
        <label>Title</label>
        <input type="text" placeholder="Title" />
        <label>Content</label>
        <input type="text" placeholder="Content" />
        <label>Video</label>
        <input type="text" placeholder="url" name="" id="" />
      </form>
    </div>
  );
}

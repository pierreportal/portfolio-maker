import React, { useState, useEffect } from "react";
import { getAllFeeds } from "../../api";
import PostEditor from "../editor/PostEditor";
import { NavLink } from "react-router-dom";
import NewPostForm from "../editor/NewPostForm";

export default function MainPage(props) {
  const [feedFromDB, setFeedFromDB] = useState({});

  useEffect(() => {
    getAllFeeds().then((data) => setFeedFromDB({ posts: data }));
  }, []);

  const feeds = {};
  feedFromDB.posts &&
    feedFromDB.posts.forEach((post) => {
      feeds[post.feedName]
        ? (feeds[post.feedName] = [...feeds[post.feedName], post])
        : (feeds[post.feedName] = [post]);
    });

  const feedsToDisplay = Object.entries(feeds).map((obj) => {
    const [name, posts] = obj;
    return (
      <>
        <h3>{name}</h3>
        {posts.map((post) => (
          <PostEditor post={post} />
        ))}
      </>
    );
  });

  return (
    <div className="feed-manager-container col">
      {/* <NavLink exact to={"/"}>
        BACK
      </NavLink> */}
      <NewPostForm />
      {feedsToDisplay}
    </div>
  );
}

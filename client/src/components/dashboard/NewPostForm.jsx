import React, { useState } from "react";

export default function NewPostForm(props) {
  return (
    <div className="dashboard-newpostform">
      <form>
        <input type="text" placeholder="Title" />
        <input type="text" placeholder="Content" />
        <button type="submit">Add new post</button>
      </form>
    </div>
  );
}

const mongoose = require("mongoose");
const { Schema } = mongoose;

const postTemplate = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  feedName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
};

const Post = mongoose.model("Post", new Schema(postTemplate));

module.exports = Post;

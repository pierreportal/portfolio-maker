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
    type: Schema.Types.Mixed,
    required: false,
  },
  media: {
    type: Schema.Types.Mixed,
    required: false,
  },
};

const Post = mongoose.model("Post", new Schema(postTemplate));

module.exports = Post;

const express = require("express");
const router = express.Router();
const Template = require("../models/Template");
const Post = require("../models/Post");

router.get("/template/:name", (req, res) => {
  const { params } = req;
  Template.findOne({ name: params.name })
    .then((template) => res.json(template))
    .catch((err) => err);
});

router.get("/feeds/:name", (req, res) => {
  const { params } = req;
  console.log(params);
  Post.find({ feedName: params.name })
    // .sort((a, b) => a.createdAt - b.createdAt)
    .then((feed) => {
      res.json(feed);
    })
    .catch((err) => err);
});

module.exports = router;

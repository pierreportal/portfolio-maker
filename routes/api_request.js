const express = require("express");
const router = express.Router();
const Template = require("../models/Template");
const Post = require("../models/Post");
const Setting = require("../models/Setting");

router.get("/template/:name", (req, res) => {
  const { params } = req;
  Template.findOne({ name: params.name })
    .then((template) => res.json(template))
    .catch((err) => err);
});

router.get("/templates", (req, res) => {
  Template.find()
    .then((template) => res.json(template.data))
    .catch((err) => err);
});

router.get("/feeds/:name", (req, res) => {
  const { params } = req;
  Post.find({ feedName: params.name })
    .then((feed) => {
      res.json(feed);
    })
    .catch((err) => err);
});

router.get("/feeds", (req, res) => {
  Post.find()
    .then((feed) => {
      res.json(feed);
    })
    .catch((err) => err);
});

router.get("/settings", (req, res) => {
  Setting.find()
    .then((feed) => {
      res.json(feed);
    })
    .catch((err) => err);
});

module.exports = router;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Setting = require("../models/Setting");

const data = require("../client/src/fakeDB.json");

// const { posts } = data.feeds[0];
// console.log(posts);

// const bcryptSalt = 10;

mongoose
  .connect("mongodb://localhost/portfoliomaker", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// let users = [
//   {
//     userName: "admin",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//     name: "Alice Neuville",
//   },
// ];

const contactTemplate = [
  {
    orderIndex: 0,
    type: "sectionTitle",
    label: "Section Title",
    content: "This is the second section",
    params: { level: "3" },
    collection: "contact",
  },
  {
    orderIndex: 1,
    type: "textComponent",
    label: "Text Paragraph",
    content:
      "this is an example of long text Charles-Pierre Baudelaire war ein französischer Schriftsteller und einer der bedeutendsten Lyriker der französischen Sprache. Er ist vor allem durch seine Gedichtsammlung Les Fleurs du Mal bekannt geworden und gilt als wichtiger Wegbereiter der literarischen",
    collection: "contact",
  },
  {
    orderIndex: 2,
    type: "textComponent",
    label: "Text Paragraph",
    content:
      "this is an example of long text Charles-Pierre Baudelaire war französischen Sprache. Er ist vor allem durch seine Gedichtsammlung Les Fleurs du Mal bekannt geworden und gilt als wichtiger Wegbereiter der literarischen",
    collection: "contact",
  },
  {
    orderIndex: 3,
    type: "collumn",
    label: "Text Collumns",
    params: null,
    collection: "contact",
  },
];

User.findOne({ userName: "admin" })
  .then((user) => {
    const set = {
      owner: user,
      name: "contact",
      bgColor: "lightgreen",
      headMenu: false,
      sideBar: false,
      headingDefaultMargin: false,
      languages: ["fr", "en"],
      siteTitle: "Alice Neuville",
      routes: [
        {
          path: "/",
          feedName: "main",
          templateName: "mainPage",
        },
        {
          path: "/contact",
          feedName: "contact",
          templateName: "contact",
        },
      ],
    };

    Setting.deleteMany()
      .then(() => {
        return Setting.create(set);
      })
      .then((usersCreated) => {
        console.log(
          `${usersCreated.length} users created with the following id:`
        );
        console.log(usersCreated.map((u) => u._id));
      })
      .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect();
      })
      .catch((err) => {
        mongoose.disconnect();
        throw err;
      });
  })
  .catch((err) => console.log(err));

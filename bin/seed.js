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

User.findOne({ userName: "admin" })
  .then((user) => {
    const set = {
      owner: user,
      font: "helvetica",
      bgColor: "lightgreen",
      headMenu: false,
      sideBar: false,
      headingDefaultMargin: false,
      languages: ["fr", "en"],
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

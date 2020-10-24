require("dotenv").config();

const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");

const express = require("Express");
// const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
// const path = require("path")

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/portfoliomaker", {
    useNewUrlParser: true,
  })
  .then((connection) =>
    console.log(`Connected to ${connection.connections[0].name}`)
  )
  .catch((err) => console.log("Error connection", err));

// const app_name = require("/.package.json").name;

const app = express();

app.use(logger("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use(
  session({
    secret: "kayboardcat",
    cokkie: { maxAge: 24 * 60 * 60 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

const index = require("./routes/index");
app.use("/", index);

// const auth = require("./routes/auth");
// app.use("/auth", auth);

const api = require("./routes/api_request");
app.use("/api", api);

module.exports = app;

app.listen(5555, () => console.log("listening......"));

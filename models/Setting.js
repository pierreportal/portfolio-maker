const mongoose = require("mongoose");
const { Schema } = mongoose;

const settingTemplate = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  font: {
    type: String,
    required: false,
  },

  bgColor: {
    type: String,
    required: false,
  },
  headMenu: {
    type: Boolean,
    required: true,
    default: false,
  },
  sideBar: {
    type: Boolean,
    required: true,
    default: false,
  },
  headingDefaultMargin: {
    type: Boolean,
    required: true,
    default: true,
  },
  languages: [
    {
      type: String,
      required: false,
    },
  ],
  siteTitle: {
    type: String,
    required: true,
  },
  routes: [
    {
      type: Schema.Types.Mixed,
    },
  ],
};

const Setting = mongoose.model("Setting", new Schema(settingTemplate));

module.exports = Setting;

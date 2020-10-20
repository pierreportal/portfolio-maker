const mongoose = require("mongoose");
const { Schema } = mongoose;

const templateTemplate = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },

  modules: [
    {
      type: Schema.Types.Mixed,
    },
  ],
};

const Template = mongoose.model("Template", new Schema(templateTemplate));

module.exports = Template;

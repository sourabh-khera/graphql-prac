const Mongoose = require("mongoose");

const eventModel = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("Events", eventModel);

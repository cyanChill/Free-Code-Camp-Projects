const mongoose = require("mongoose");
const { Schema } = mongoose;

const shortenURLSchema = new Schema({
  original_url: String,
  short_url: Number,
});

module.exports = mongoose.model("shortenURL", shortenURLSchema);

const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  // element: {
  //   type: String,
  // },
});

const List = mongoose.model("List", ListSchema);

module.exports = List;

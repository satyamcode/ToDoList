const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

module.exports = connectDB;

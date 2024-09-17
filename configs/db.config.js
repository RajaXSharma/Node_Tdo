const mongoose = require("mongoose");

const DB_CONN = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/TODO_APP`);
    console.log("connected");
  } catch (error) {
    console.log("error connecting to the database");
    console.log(error)
    process.exit(1);
  }
};
module.exports = { DB_CONN };

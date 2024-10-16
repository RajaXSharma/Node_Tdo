const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

async function DB_CONN() {
  try {
    await client.connect();
    console.log("connected succesfully to db");
  } catch (err) {
    console.log("failed to connect error :", err.stack);
  }
}

module.exports = { DB_CONN , client };

const { client } = require("../configs/db.config");
const db = client.db("todo_db");
const userCollection = db.collection("user");

const todoLogin = async (req, res) => {
  res.json("login");
};

const todoSignup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "fill all fields",
    });
  }

  try {
    const userExists = await userCollection.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const user = await userCollection.insertOne({ email, password });
    console.log(user);

    return res.status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { todoLogin, todoSignup };

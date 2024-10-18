const { client } = require("../configs/db.config");
const db = client.db("todo_db");
const userCollection = db.collection("user");
const bcrypt = require("bcrypt");
const genToken = require("../Utils/genToken");

// cookies options
const options = {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 3600000,
  secure: true,
};

const todoLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "provide all fields",
    });
  }

  try {
    //check email exists
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "email not found",
      });
    }

    //match passwords
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res.status(401).json({
        message: "incorrect password",
      });
    }

    //gen token and sent to cookies
    const token = await genToken(user._id);
    return res.cookie("token", token, options).status(200).json({
      message: "successfully loggedIn",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server side error",
      error: error.message,
    });
  }
};

const todoSignup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "fill all fields",
    });
  }

  try {
    // check if user exists already
    const userExists = await userCollection.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    //hash the password
    const hash = await bcrypt.hash(password, 10);

    // save to the database
    const user = await userCollection.insertOne({ email, password: hash });

    //generate token
    const token = await genToken(user.insertedId);

    return res.cookie("token", token, options).status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  //set token empty for logout
  return res.cookie("token", "").status(200).json({
    message: "logged out",
  });
};

module.exports = { todoLogin, todoSignup, logout };

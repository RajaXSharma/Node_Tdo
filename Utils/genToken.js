const jwt = require("jsonwebtoken");

const genToken = async (_id) => {
  const token = await jwt.sign({ _id: _id }, process.env.SECRET_TOKEN, {
    expiresIn: "20s",
  });
  return token;
};

module.exports = genToken;

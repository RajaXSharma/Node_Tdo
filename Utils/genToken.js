const jwt = require("jsonwebtoken");

const genToken = async (_id) => {
  const token = await jwt.sign({ _id: _id }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });
  console.log(token)
  return token;
};

module.exports = genToken;

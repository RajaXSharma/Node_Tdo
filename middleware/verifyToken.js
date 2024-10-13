const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("unauthrized no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded._id;
    next()
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("invalid token");
  }


  if (Object.keys(token).length === 0) {
    return res.status(401).json({
      message: "unauthrized invalid token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded._id;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = verifyToken;

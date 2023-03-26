const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers?.authorization) {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }
  const token = req.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.redirect("/login");
    }
    req.user = decoded.email;
    next();
  });
};

module.exports = { authentication };

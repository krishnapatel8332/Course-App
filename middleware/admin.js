const jwt = require("jsonwebtoken");

function auth_admin(req, res, next) {
  const token = req.headers.token;
  const verified = jwt.verify(token, process.env.ADSECRET_KEY);

  if (verified) {
    req.adminId = verified.Id;
    next();
  } else {
    res.status(403).json({
      message: "You are signed in",
    });
  }
}

module.exports = {
  auth_admin: auth_admin,
};

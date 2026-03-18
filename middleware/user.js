const jwt = require("jsonwebtoken");

function user_auth(req, res, next) {
  const token = req.headers.token;
  const valid = jwt.verify(token, process.env.SECRET_KEY);

  if (valid) {
    ((req.userId = valid.Id), next());
  } else {
    res.status(403).json({
      message: "You are not signned in",
    });
  }
}
module.exports = {
  user_auth: user_auth,
};

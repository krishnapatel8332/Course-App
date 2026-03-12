const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", function (req, res) {});

userRouter.post("/signin", function (req, res) {});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "No data is found",
  });
});

module.exports = {
  userRouter: userRouter,
};

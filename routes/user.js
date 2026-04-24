const { Router } = require("express");
const userRouter = Router();
const { userModel, courseModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user_auth } = require("../middleware/user");

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const validate = z.object({
    email: z.email("Invalid email address"),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });
  const result = validate.safeParse(req.body);
  if (!result.success) {
    res.json({
      message: "Invalid input",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await userModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occured",
    });
  }
});

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const validateUser = z.object({
    email: z.email("Invalid email address"),
    password: z.string(),
  });

  const result = validateUser.safeParse(req.body);

  if (!result.success) {
    res.json({
      message: "Invalid credentials",
    });
  }
  const user = await userModel.findOne({
    email: email,
  });
  if (!user) {
    res.json({
      message: "User does not exist",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.json({
      message: "Incorrect Password",
    });
  }
  const token = jwt.sign(
    {
      Id: user._id,
    },
    process.env.SECRET_KEY,
  );
  res.json({
    token: token,
    message: "loggedin successfully",
  });
});

userRouter.get("/purchases", user_auth, async function (req, res) {
  const userId = req.userId;
  const courses = await courseModel.find({
    userId,
  });
  res.json({
    message: "Your courses",
    courses,
  });
});

module.exports = {
  userRouter: userRouter,
};

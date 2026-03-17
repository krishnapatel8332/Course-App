const { Router } = require("express");
const userRouter = Router();
const { userModel } = require("./db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Krishna90978";

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const validate = z.object({
    email: z.email("Invalid email address").string(),
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
    email: z.email().string(),
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
      UserId: user._id,
    },
    JWT_SECRET,
  );
  res.json({
    token: token,
    message: "loggedin successfully",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "No data is found",
  });
});

module.exports = {
  userRouter: userRouter,
};

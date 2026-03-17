const { Router } = require("express");
const userRoute = Router();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { userModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_KEY = "kruhnnabhdsj";

userRoute.post("signup", async function (req, res) {
  const { username, password, email, lastname } = req.body;
  const valid = z.object({
    email: z.email().string(),
    username: z.string(),
    lastname: z.string(),
    password: z.string(),
  });
  const result = valid.safeParse(req.body);
  if (!result) {
    res.json({
      message: "Incorrect coredentials",
    });
  }
  try {
    const hasedpass = await bcrypt.hash(password, 8);
    await userModel.create({
      username,
      email,
      password,
      lastname,
    });
    res.json({
      message: "signup successfull",
    });
  } catch (err) {
    res.json({
      message: "error occured",
    });
  }
});

userRoute.post("signin", async function (req, res) {
  const { email, password } = req.body;
  const vald = z.object({
    email: z.email().string(),
    password: z.string(),
  });
  const result = vald.safeParse(req.body);
  if (!result.success) {
    res.json({
      message: "Invalid credential",
    });
  }
  const user = await userModel.findOne({
    email,
  });
  if (!user) {
    res.json({
      message: "user does not exist",
    });
  }
  const checkpass = await bcrypt.compare(password, user.password);
  if (!checkpass) {
    res.json({
      message: "incorrect password",
    });
  }
  const token = jwt.sign(
    {
      userID: user._id,
    },
    JWT_KEY,
  );
  res.json({
    message: "User loggedin",
    token: token,
  });
});

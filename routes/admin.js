const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel, userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { auth_admin } = require("../middleware/admin");
adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const validate = z.object({
    email: z.email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });
  const parsing = validate.safeParse(req.body);
  if (!parsing.success) {
    res.json({
      message: "Invalid input",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await adminModel.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "Admin is successfully registered",
    });
  } catch (err) {
    res.status(500).json({
      message: "Errored occured",
    });
  }
});
adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const validate = z.object({
    email: z.email(),
    password: z.string(),
  });
  const parsing = validate.safeParse(req.body);
  if (!parsing.success) {
    res.json({
      message: "Invalid credentials",
    });
  }
  const admin = await adminModel.findOne({
    email: email,
  });
  if (!admin) {
    res.json({
      message: "user does not found",
    });
  }
  const checkpass = await bcrypt.compare(password, admin.password);
  if (!checkpass) {
    res.json({
      message: "Password is not correct",
    });
  }
  const token = jwt.sign(
    {
      Id: admin._id,
    },
    process.env.ADSECRET_KEY,
  );
  res.json({
    message: "User is logged in successfully",
    token: token,
  });
});
adminRouter.post("/course", auth_admin, async function (req, res) {
  const adminId = req.adminId;
  const { title, description, price, imageURL } = req.body;
  const course = await courseModel.create({
    title: title,
    description: description,
    price: price,
    imageURL: imageURL,
    creatorId: adminId,
  });
  res.json({
    message: "course has been created suuccessfully",
    courseId: course._id,
  });
});
adminRouter.put("/course", auth_admin, async function (req, res) {
  const adminId = req.adminId;
  const { title, description, price, imageURL, courseId } = req.body;
  const course = await courseModel.findOneAndUpdate(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      price,
      imageURL,
    },
    { new: true },
  );

  if (!course) {
    return res.json({ message: "Course not found" });
  }

  res.json({
    message: "Updated",
    course,
  });
});
adminRouter.get("/all", auth_admin, async function (req, res) {
  const adminId = req.adminId;
  const courses = await courseModel.find({
    creatorId: adminId,
  });
  res.json({
    message: "Courses",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};

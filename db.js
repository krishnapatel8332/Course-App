const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(
  "mongodb+srv://kp8332064_db_user:nIXRE9qpEXjPP8le@cluster0.kd08l6s.mongodb.net/course_app",
);
const user = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});
const course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  creatorId: ObjectId,
});
const purchase = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("user", user);
const adminModel = mongoose.model("admin", admin);
const courseModel = mongoose.model("course", course);
const purchaseModel = mongoose.model("purchases", purchase);

module.exports = {
  userModel: userModel,
  adminModel: adminModel,
  courseModel: courseModel,
  purchaseModel: purchaseModel,
};

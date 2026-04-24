const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  const mongouri = process.env.MONGO_URI;
  await mongoose.connect(mongouri);
  const port = process.env.PORT;
  app.listen(port, function () {
    console.log(`server running on ${port}`);
  });
}
main();

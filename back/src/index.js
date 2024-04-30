const express = require("express");
const userRouter = require("./Controllers/Routes/user");
const equipmentRouter = require("./Controllers/Routes/equipment");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.set("view engine", "ejs");

// app.use(express.static("./Controllers/uploads"));
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/equipment", equipmentRouter);

app.listen(process.env.PORT, () => {
  console.log("im listening on port", process.env.PORT);
});

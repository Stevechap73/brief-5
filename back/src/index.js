const express = require("express");
const userRoute = require("./Controllers/Routes/user");
const equipmentRoute = require("./Controllers/Routes/equipment");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);
app.use("/equipment", equipmentRoute);

app.listen(process.env.PORT, () => {
  console.log("im listening on port", process.env.PORT);
});

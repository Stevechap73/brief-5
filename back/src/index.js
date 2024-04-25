const express = require("express");
const router = require("./Controllers/Routes/register");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/user", router);

app.listen(process.env.PORT, () => {
  console.log("im listening on port", process.env.PORT);
});

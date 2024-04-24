const express = require("express");
const router = require("./Controllers/Routes/register");
const app = express();

app.use(express.json());

const PORT = 3003;

app.use("/api", router);

app.listen(PORT, () => {
  console.log("im listening on port", PORT);
});

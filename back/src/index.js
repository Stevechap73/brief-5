const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3003;

app.listen(PORT, () => {
  console.log("im listening on port", PORT);
});

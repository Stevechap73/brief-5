const express = require("express");
const { addUser } = require("../userController");

// importer les middlewares
const { verifRegister } = require("../../Middlewares/middlewares");

const router = express.Router();

// ajout d'un user
router.post("/user/add", verifRegister, addUser);

module.exports = router;

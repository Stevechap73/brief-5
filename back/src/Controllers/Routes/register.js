const express = require("express");
const { addUser, register } = require("../userController");

// importer les middlewares
const { verifRegister } = require("../../Middlewares/middlewares");

const router = express.Router();

// ajout d'un user
router.post("/register", verifRegister, register);

module.exports = router;

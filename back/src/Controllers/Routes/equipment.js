const express = require("express");
const { addEquiment } = require("../equimentController");

// importer les middlewares
const { verifAddEquipment } = require("../../Middlewares/middlewares");

const router = express.Router();

// ajout d'un equipement
router.post("/add", verifAddEquipment, addEquiment);

module.exports = router;

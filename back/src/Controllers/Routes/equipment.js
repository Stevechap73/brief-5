const express = require("express");
const {
  addEquipmentImage,
  addEquiment,
  getAllEquipment,
  getAllEquipmentIsTrue,
  getAllEquipmentIsFalse,
  deleteEquipment,
  UpdateEquipment,
} = require("../equimentController");

// importer les middlewares
const {
  verifAddEquipment,
  verifUpdate,
} = require("../../Middlewares/middlewares");

const router = express.Router();

// ajout d'une image équipement
router.post("/add/image", addEquipmentImage);

// ajout d'un equipement
router.post("/add/equipment", verifAddEquipment, addEquiment);

// obtenir tous les equipements
router.get("/all", getAllEquipment);

// obtenir tous les equipements disponible
router.get("/all/true", getAllEquipmentIsTrue);

// obtenir tous les equipements loués
router.get("/all/false", getAllEquipmentIsFalse);

// supprimer un équipement
router.delete("/delete/:id", deleteEquipment);

// modifier un équipement
router.patch("/update/:id", verifUpdate, UpdateEquipment);

module.exports = router;

const { pool } = require("../Connections/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

// Ajout d'un équipement une fois que le middleware est validé
const addEquiment = async (req, res) => {
  try {
    const name = req.name;
    const description = req.description;
    const image = req.image;
    const disponibilite = req.disponibilite;
    const price = req.price;
    const values = [name, description, image, disponibilite, price];
    const sql =
      "INSERT INTO equipment (name, description, image, disponibilite, price) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await pool.execute(sql, values);
    if (rows.affectedRows > 0) {
      res.status(201).json({ success: "Equipement ajouté" });
      return;
    } else {
      res.status(500).json({ error: "L'ajout de l'équipement a échoué" });
      return;
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Erreur du serveur" });
    return;
  }
};

module.exports = { addEquiment };

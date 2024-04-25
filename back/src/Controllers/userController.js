const { pool } = require("../Connections/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

// Ajout d'un user une fois que le middleware est validé
const register = async (req, res) => {
  try {
    const email = req.email;
    const values = [email];
    const sql = `SELECT email FROM user WHERE email =  ?`;
    const [result] = await pool.execute(sql, values);
    if (result.length !== 0) {
      res.status(400).json({ error: "Mail déjà dans la base" });
      return;
    } else {
      const password = req.password;
      const role = req.role;
      const firstName = req.firstName;
      const adress = req.adress;

      const hash = await bcrypt.hash(password, 10);
      const sqlInsertRequest =
        "INSERT INTO user (email, password, role, firstName, adress) VALUES (?, ?, ?, ?, ?)";
      const insertValues = [email, hash, role, firstName, adress];
      const [rows] = await pool.execute(sqlInsertRequest, insertValues);
      if (rows.affectedRows > 0) {
        res.status(201).json({ success: "inscription réussi" });
        return;
      } else {
        res.status(500).json({ error: "L'nscription a échoué" });
        return;
      }
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Erreur du serveur" });
    return;
  }
};

module.exports = { register };

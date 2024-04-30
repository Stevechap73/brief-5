const { pool } = require("../Connections/db");
const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const uploadDirectory = path.join(__dirname, "uploads");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const validator = require("validator");
const { CLIENT_RENEG_LIMIT } = require("tls");
require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

// insertion d'une image équipement
const addEquipmentImage = async (req, res) => {
  let newFileName;
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      newFileName = `${file.fieldname}-${Date.now()}.jpg`;
      cb(null, newFileName);
    },
  });

  const maxSize = 3 * 1000 * 1000;

  let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
      let filetypes = /jpeg|jpg|png/;
      let mimetype = filetypes.test(file.mimetype);

      let extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      }

      cb(
        "Erreur: Le téléchargement de fichiers ne prend en charge que " +
          "les types de fichiers suivants - " +
          filetypes
      );
    },
  }).single("image");

  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ newFileName: newFileName });
    }
  });
};

// Ajout d'un équipement une fois que le middleware est validé
const addEquiment = async (req, res) => {
  try {
    const name = req.name;
    const description = req.description;
    const image = req.body.image;
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

// affichage de tous les équipements pour l'admin
const getAllEquipment = async (req, res) => {
  try {
    const sql = `SELECT * FROM  equipment`;
    const [result] = await pool.query(sql);

    res.status(200).json({ result });
    return;
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// affichage de tous les équipements qui sont disponibles
const getAllEquipmentIsTrue = async (req, res) => {
  try {
    const sql = `SELECT * FROM  equipment WHERE disponibilite = 'true'`;
    const [result] = await pool.query(sql);

    res.status(200).json({ result });
    return;
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// affichage de tous les équipements qui sont loués en cours
const getAllEquipmentIsFalse = async (req, res) => {
  try {
    const sql = `SELECT * FROM  equipment WHERE disponibilite = 'false'`;
    const [result] = await pool.query(sql);

    res.status(200).json({ result });
    return;
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Supprimer un équipement pour l'admin
const deleteEquipment = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const values = [id];
  try {
    const sql = `DELETE FROM equipment where id = ?`;
    const [rows] = await pool.execute(sql, values);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

// modifier la disponibilité d'un équipement pour l'admin
const UpdateEquipment = async (req, res) => {
  try {
    let data = req.data;
    let values = req.values;
    const sql = `UPDATE equipment SET ${data} where id = ? `;
    const [result] = await pool.execute(sql, values);
    res.status(200).json(result);
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "erreur serveur" });
  }
};

module.exports = {
  addEquiment,
  addEquipmentImage,
  getAllEquipment,
  getAllEquipmentIsTrue,
  getAllEquipmentIsFalse,
  deleteEquipment,
  UpdateEquipment,
};

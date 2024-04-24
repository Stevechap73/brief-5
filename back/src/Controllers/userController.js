const { pool } = require("../Connections/db");
const validator = require("validator");

// Ajout d'un user une fois que le middleware est validé
const addUser = async (req, res) => {
  try {
    const email = req.email;
    const password = req.password;
    const role = req.role;
    const firstName = req.firstName;
    const adress = req.adress;
    const [rows] = await pool.query(
      `INSERT INTO user (email, password, role, 
        firstName, adress) 
        VALUES (?, ?, ?, ?, ?);`,
      [email, password, role, firstName, adress]
    );
    console.log(rows);
    //  rows.affectedRows > 0  return vrai si c'est bien insérer False sinon
    res.json({ success: rows.affectedRows > 0 });
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = { addUser };

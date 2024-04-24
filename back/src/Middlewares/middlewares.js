const validator = require("validator");

const verifRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const firstName = req.body.firstName;
  const adress = req.body.adress;

  //  vérification du body
  if (
    !validator.isAlpha(email) ||
    !validator.isAlpha(password) ||
    !validator.isAlpha(role) ||
    !validator.isAlpha(firstName) ||
    !validator.isAlpha(adress)
  ) {
    return res.json({ message: "les ne doivent contenir que des lettres" });
  }

  req.email = email;
  req.password = password;
  req.role = role;
  req.firstName = firstName;
  req.adress = adress;
  next();
};

module.exports = { verifRegister };

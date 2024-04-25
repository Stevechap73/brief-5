const validator = require("validator");

const verifRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const firstName = req.body.firstName;
  const adress = req.body.adress;

  //  vérification du body
  if (!validator.isEmail(email)) {
    return res.json({
      message: "Votre mail n'est pas conforme voir ex : example@exemple.com",
    });
  }
  if (!validator.isAlphanumeric(password)) {
    return res.json({
      message:
        "Votre mot de passe ne doit contenir que des lettres et des chiffres",
    });
  }
  if (!validator.isAlpha(role)) {
    return res.json({ message: "Role ne doit contenir que des lettres" });
  }
  if (!validator.isAlpha(firstName)) {
    return res.json({ message: "Nom doit contenir que des lettres" });
  }
  if (!validator.isAlphanumeric(adress)) {
    return res.json({
      message: "adress doit contenir que des lettres ou des chiffres",
    });
  }

  req.email = email;
  req.password = password;
  req.role = role;
  req.firstName = firstName;
  req.adress = adress;
  next();
};

module.exports = { verifRegister };

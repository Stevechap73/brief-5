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

const verifLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

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

  req.email = email;
  req.password = password;
  next();
};

const verifAddEquipment = async (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  // const image = req.body.image;
  const disponibilite = req.body.disponibilite;
  const price = req.body.price;

  //  vérification du body
  if (!validator.isAlphanumeric(name)) {
    return res.json({
      message: "Le name doit contenir des lettres ou des chiffres",
    });
  }
  if (!validator.isAlphanumeric(description)) {
    return res.json({
      message: "La description doit contenir des lettres ou des chiffres",
    });
  }
  // if (!validator.isURL(image)) {
  //   return res.json({
  //     message: "L'image doit contenir une URL d'image http://",
  //   });
  // }
  if (!validator.isBoolean(disponibilite)) {
    return res.json({ message: "Disponibilité doit être true ou false" });
  }
  if (!validator.isCurrency(price)) {
    return res.json({
      message: "price est indiquer un prix",
    });
  }

  req.name = name;
  req.description = description;
  // req.image = image;
  req.disponibilite = disponibilite;
  req.price = price;
  next();
};

const verifUpdate = async (req, res, next) => {
  const id = req.params.id;
  const { name, description, price, disponibilite } = req.body;
  let data = [];
  let values = [];
  if (name) {
    data.push("name= ?");
    values.push(name);
  }
  if (description) {
    data.push("description= ?");
    values.push(description);
  }
  if (price) {
    data.push("price= ?");
    values.push(price);
  }
  if (disponibilite) {
    data.push("disponibilite= ?");
    values.push(disponibilite);
  }
  console.log(values);
  if (data.length == 0) {
    return res.json({ message: "vous avez modifier aucune donnée" });
  }
  values.push(id);
  data = data.join(",");
  req.data = data;
  req.values = values;
  next();
};

module.exports = { verifRegister, verifAddEquipment, verifUpdate };

const User = require("./model");

const create = (req, res, next) => {
  const newUser = new User({ ...req.body });
  newUser.save((err) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      console.log(newUser, req.body);
      res.status(201).json({
        message: "new User created",
      });
    }
  });
};

const getAll = (req, res) => {
  User.find()
    .then((data) => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Resource not found" });
      }
    })
    .catch((error) => next(error));
};

const getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.send(error);
  }
};

const addToBasket = async (req, res) => {
  console.log("bodyy", req.body);
  const { email } = req.params;

  const userUpdated = await User.updateOne(
    { email: email },
    { $push: req.body },
    { multi: true }
  ).catch((err) => {
    console.log("Error", err);
    res.status(500).json({ message: "Could not add to basket" });
  });

  if (userUpdated) {
    console.log("user", userUpdated);
    return res.json({ message: "product added to basket", data: userUpdated });
  }
};

const deleteFromBasket = async (req, res) => {
  console.log("bodyy", req.body);
  const { email } = req.params;

  const userUpdated = await User.updateOne(
    { email: email },
    { $pull: req.body },
    { multi: true }
  ).catch((err) => {
    console.log("Error", err);
    res.status(500).json({ message: "Could not delete item from basket" });
  });

  if (userUpdated) {
    console.log("user", userUpdated);
    return res.json({
      message: "product deleted from basket",
      data: userUpdated,
    });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteFromBasket,
  addToBasket,
};

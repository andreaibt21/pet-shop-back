const Product = require("./model");

//crear un producto
const create = (req, res) => {
  const newProduct = new Product({ ...req.body });
  newProduct.save((err) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(newProduct, req.body);
      res.status(201).json({
        message: "new product created",
      });
    }
  });
};

const getAll = (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: error }));
};

const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.send(error);
  }
};


const modify = (req, res) => {
  res.send(`<h1>modify product patch  ${req.params.id}</h1>`);
};
const deleteById = (req, res) => {
  res.send(`<h1>delet product by id -  ${req.params.id}</h1>`);
};

module.exports = {
  create,
  getAll,
  getById,
  modify,
  deleteById,
};

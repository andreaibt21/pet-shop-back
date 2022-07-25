const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: { type: String },
    des: { type: String },
    stock: { type: Number, min: 0 },
    price: { type: Number },
    img: { type: String },
  },
  { versionKey: false }
);

const product = mongoose.model("Product", ProductSchema);
module.exports = product;

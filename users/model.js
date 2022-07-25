const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let random = Math.random();

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },

    basket: [
      {
        name: String,
        des: String,
        price: Number,
        img: String,
      },
    ],
  },
  { versionKey: false }
);
UserSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.__v;
    // delete ret.__id;
    delete ret.password;
  },
});

const user = mongoose.model("User", UserSchema);
module.exports = user;

const User = require("../users/model");
const { hashPassword, checkPassword } = require("../users/password");
const randomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};

const register = async (req, res) => {
  
  console.log(req.body);

  const { name, userName, email } = req.body;
  const password = await hashPassword(req.body.password);
  const data = { name, userName, email, password};
  const newUser = await new User(data).save().catch((error) => {
    console.log(error);
    res.status(500).json({ message: "Could not creat user" });
  });
  if (newUser) {
    res.status(200).json({ message: "new user created", data: newUser });
  }
};

// //LOGIN
const login = async (req, res ) => {
  console.log(req);
  const user = await User.find().where({ userName: req.body.userName });
  if (!user.length) {
    return res
      .status(401)
      .json({ message: "Incorrect user name or password " });
  }
  const hashedPassword = user[0].password;
  const match = await checkPassword(req.body.password, hashedPassword);
  match
    ? res.status(200).json({ message: "access granted", data: user[0] })
    : res.status(401).json({ message: "Incorrect user name or password " });
};

module.exports = { register, login };

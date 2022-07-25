const router = require("express").Router();
const users = require("./controler");

router.get("/", users.getAll);

router.get("/:id", users.getOne);

router.post("/:email", users.addToBasket);

router.delete("delete/:email", users.deleteFromBasket);

module.exports = router;

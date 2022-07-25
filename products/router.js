const router = require("express").Router();
const products = require("./controler")

//Endpoints
//  añade
router.post("/", products.create);

//TODOS
router.get("/", products.getAll);
//UNO
router.get("/:id", products.getById);
//MODIFICA UNO
router.patch("/:id", products.modify);

router.delete("/:id", products.deleteById);

module.exports = router;

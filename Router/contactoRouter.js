const express = require("express");
const router = express.Router();
const contactoController = require("../Controller/contactoController");

router.get("/contacto", contactoController.all);
router.post("/contacto/create", contactoController.add);
router.get("/contacto/update/:id", contactoController.byId);
router.post("/contacto/search", contactoController.search);
router.put("/contacto/update/:id", contactoController.put);
router.delete("/contacto/delete/:id", contactoController.delete);

module.exports = router;

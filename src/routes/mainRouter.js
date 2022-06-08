// Acá nos falta express y el router
const express = require("express");

const router = express.Router();

// Aća nos falta traer el controller
const mainController = require("../controllers/mainController");
// Acá definimos las rutas
router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/productCart", mainController.productCart);
router.get("/productDetail", mainController.productDetail);
router.get("/register", mainController.register);
router.get("/smartwatchs", mainController.smartwatchs);
router.get("/mouses", mainController.mouses);
router.get("/smartphones", mainController.smartphones);
router.get("/auriculares", mainController.auriculares);
router.get("/tablets", mainController.tablets);
router.get("/pcs", mainController.pcs);
router.get("/monitores", mainController.monitores);
router.get("/audifonos", mainController.audifonos);
router.get("/quienessomos", mainController.quienessomos);
/* router.get("/admin", productsController.index); */

router.get ("/pruebasession",mainController.session)
// Acá exportamos el resultado
module.exports = router;

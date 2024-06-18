const express = require('express');
const router = express.Router();
const categoriesAPIController = require('../../controllers/api/categoriesAPIController');

//Rutas
//Listado de todos los generos
router.get('/', (req, res, next) => {
    console.log('Accediendo a /api/categories');  // debugging log
    next();
}, categoriesAPIController.list);

//Detalle del genero
router.get('/:id', (req, res, next) => {
    console.log(`Accediendo a /api/categories/${req.params.id}`);  // debugging log
    next();
}, categoriesAPIController.detail);

//Películas por genero
router.get('/:id/products', (req, res, next) => {
    console.log(`Accediendo a /api/categories/${req.params.id}/products`); // debugging log
    next();
}, categoriesAPIController.categoryProducts);

module.exports = router;

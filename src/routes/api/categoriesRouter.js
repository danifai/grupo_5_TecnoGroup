const express = require('express');
const router = express.Router();
const categoriesAPIController = require('../../controllers/api/categoriesAPIController');

//Rutas
//Listado de todos los generos
router.get('/', (req, res, next) => {
    console.log('Accediendo a /api/categories');
    next();
}, categoriesAPIController.list);

//Detalle del genero
router.get('/:id', (req, res, next) => {
    console.log(`Accediendo a /api/categories/${req.params.id}`);
    next();
}, categoriesAPIController.detail);

//Películas por genero
router.get('/:id/products', (req, res, next) => {
    console.log(`Accediendo a /api/categories/${req.params.id}/products`);
    next();
}, categoriesAPIController.categoryProducts);

module.exports = router;

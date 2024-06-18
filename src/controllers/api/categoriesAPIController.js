const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const Categories = db.Category;
const Products = db.Product;

const categoriesAPIController = {
    'list': (req, res) => {
        console.log('Entrando a categoriesAPIController.list');
        db.Category.findAll()
        .then(categories => {
            console.log('Categorias encontradas:', categories);
            let respuesta = {
                meta: {
                    status : 200,
                    total: categories.length,
                    url: 'api/categories'
                },
                data: categories
            };
            res.json(respuesta);
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
            res.status(500).json({ message: 'Error al obtener categorías' });
        });
    },
    
    'detail': (req, res) => {
        console.log(`Entrando a categoriesAPIController.detail con id: ${req.params.id}`);
        db.Category.findByPk(req.params.id)
        .then(category => {
            if (category != null) {
                console.log('Categoria encontrada:', category);
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.length,
                        url: '/api/category/:id/'
                    },
                    data: category
                };
                res.json(respuesta);
            } else {
                console.log('Categoria no encontrada');
                let respuesta = {
                    meta: {
                        status: 404,
                        total: 0
                    }
                };
                res.json(respuesta);
            }
        })
        .catch(error => {
            console.error('Error al obtener detalle de categoría:', error);
            res.status(500).json({ message: 'Error al obtener detalle de categoría' });
        });
    },
    
    'categoryProducts': (req, res) => {
        console.log(`Entrando a categoriesAPIController.categoryProducts con id: ${req.params.id}`);
        db.Category.findByPk(req.params.id, {
            include: ['products']
        })
        .then(category => {
            if (category != null) {
                console.log('Categoria con productos encontrada:', category);
                let respuesta = {
                    meta: {
                        status: 200,
                        total: category.products.length,
                        url: '/api/category/:id/products'
                    },
                    data: category
                };
                res.json(respuesta);
            } else {
                console.log('Categoria con productos no encontrada');
                let respuesta = {
                    meta: {
                        status: 404,
                        total: 0
                    }
                };
                res.json(respuesta);
            }
        })
        .catch(error => {
            console.error('Error al obtener productos de categoría:', error);
            res.status(500).json({ message: 'Error al obtener productos de categoría' });
        });
    }
}

module.exports = categoriesAPIController;

const path = require('path');
const { Op } = require("sequelize");
const moment = require('moment');
const db = require('../../database/models');

const sequelize = db.sequelize;
const Product = db.Product;
const Category = db.Category;

const ProductsAPIController = {
  'list': async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: [{
          model: Product,
          as: 'products',
          attributes: [] // No necesitamos los atributos de productos en este caso
        }],
        attributes: [
          'id',
          'category_name',
          [sequelize.fn('COUNT', sequelize.col('products.id')), 'products_count'],
        ],
        group: ['Category.id', 'Category.category_name']
      });

      let countByCategory = categories.reduce((counts, currentCategory) => {
        return {
          ...counts,
          [currentCategory.category_name]: parseInt(currentCategory.dataValues.products_count, 10)
        };
      }, {});

      const count = await Product.count();
      const products = await Product.findAll({
        include: ['product_images']
      });

      let respuesta = {
        count,
        countByCategory,
        products: products.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          detail: '/api/products/' + product.id,
          images: product.product_images
        }))
      };
      res.json(respuesta);
    } catch (error) {
      console.error('Error en la API de productos:', error);
      res.status(500).json({ error: 'An error occurred', details: error.message });
    }
  },

  'detail': async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: ['product_images', 'categories', 'invoice_detail', 'product_financing', 'products_cart']
      });
      if (product != null) {
        res.json({
          ...product.dataValues,
          product_images: product.product_images.map(image => ({
            ...image.dataValues,
            url: '/img/' + image.name
          }))
        });
      } else {
        res.status(404).json({
          meta: {
            status: 404,
            total: 0
          }
        });
      }
    } catch (error) {
      console.error('Error en el detalle del producto:', error);
      res.status(500).json({ error: 'An error occurred', details: error.message });
    }
  },
};

module.exports = ProductsAPIController;
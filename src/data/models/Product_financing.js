module.exports = (sequelize,dataTypes) => {
    let alias = 'Product_financing';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          installment_amount: {
            type: dataTypes.MEDIUMINT(),
            allowNull: false
          },
          number_of_installments: {
            type: dataTypes.TINYINT(),
            allowNull: false
          },
          product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
          },

    };
    let config = {
        tableName: 'product_financing',
        timestamps: false
    };
    const Product_financing = sequelize.define(alias,cols, config)

    Product_financing.associate = function (models) {
      Product_financing.belongsTo(models.Product, {
        as: "products",
        foreignKey: "product_id"
      })
    }

    return Product_financing
}
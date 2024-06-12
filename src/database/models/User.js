module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name_and_surname: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    country: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    image: {
      type: dataTypes.STRING(100),
      allowNull: false
    },
  };
  let config = {
    tableName: 'users',
    timestamps: false
  };
  const User = sequelize.define(alias, cols, config)

  User.associate = function (models) {

    User.belongsTo(models.Role, {
      as: "roles",
      foreignKey: "role_id"
    })

    User.hasMany(models.Invoice, {
      as: "invoices",
      foreignKey: "user_id"
    })

    User.hasMany(models.Purchase, {
      as: "purchases",
      foreignKey: "user_id"
    })

    User.hasMany(models.User_card, {
      as: "user_cards",
      foreignKey: "user_id"
    })

    User.hasMany(models.Product_cart, {
      as: "products_cart",
      foreignKey: "user_id"
    })

  }

  return User
}
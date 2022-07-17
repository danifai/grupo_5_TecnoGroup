module.exports = (sequelize,dataTypes) => {
    let alias = 'Invoice_detail';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          invoice_id: {
            type: dataTypes.INT(),
            allowNull:false,
          },
          number_of_installments: {
            type: dataTypes.TINYINT(),
            allowNull: false
          },
          installment_amount: {
            type: dataTypes.MEDIUMINT(),
            allowNull: false
          },
          products_id: {
            type: dataTypes.INT(),
            allowNull: false
          },

    };
    let config = {
        tableName: 'invoice_detail',
        timestamps: false
    };
    const Role = sequelize.define(alias,cols, config)

    return Role
}
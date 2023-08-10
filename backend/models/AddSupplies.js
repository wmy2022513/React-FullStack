module.exports = (sequelize, DataTypes) => {
  const AddSupplies = sequelize.define(
    "AddSupplies",
    {
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      invoice_id: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: false,
      tableName: "AddSupplies",
    }
  );

  return AddSupplies;
};

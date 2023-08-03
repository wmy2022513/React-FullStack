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
  // AddSupplies.belongsTo(sequelize.models.Bookings, {
  //   foreignKey: "booking_id", // This is the foreign key column in AddSupplies
  // });

  return AddSupplies;
};

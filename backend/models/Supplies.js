module.exports = (sequelize, DataTypes) => {
  const Supplies = sequelize.define("Supplies", {
    item:{
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName:'Supplies'
  }
  );
  return Supplies;
};
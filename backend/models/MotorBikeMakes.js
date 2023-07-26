module.exports = (sequelize, DataTypes) => {
  const MotorBikeMakes = sequelize.define("MotorBikeMakes", {
    makes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName:'MotorBikeMakes'
  }
  );

  return MotorBikeMakes;
};

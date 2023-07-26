module.exports = (sequelize, DataTypes) => {
  const ServiceFee = sequelize.define("ServiceFee",{
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fee: {
      type:DataTypes.INTEGER,
      allowNull:false,
    }
  },
  {
    timestamps:false,
    tableName:"ServiceFee"
  });
  return ServiceFee;
}
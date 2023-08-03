module.exports = ( sequelize, DataTypes) => {
    const Bookings = sequelize.define("Bookings", {
      username:{
        type: DataTypes.STRING,
        allowNull:false
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licenseDetails: {
        type: DataTypes.STRING,
        allowNull:false,
      },
      vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicleBrand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type:DataTypes.STRING,
        allowNull:false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      engineType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serviceFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      selectedDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      selectedTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userDescription: {
        type: DataTypes.STRING,
        allowNull:false
      },
      service_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      invoice_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      booking_seq: {
        type: DataTypes.INTEGER,
        allowNull:false
      }
    });

    Bookings.associate = (models) => {
      Bookings.hasMany(models.AddSupplies, {
        onDelete: "cascade",
      });
    }

    return Bookings;
}


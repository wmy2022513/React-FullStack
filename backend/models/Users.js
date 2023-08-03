module.exports = ( sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"customer"
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });


    return Users;
}
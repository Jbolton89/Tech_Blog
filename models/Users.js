const sequelize = require('../config/connection');
const {
    Model,
    DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');

class Users extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Users.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8],
                },
            },
        },
        {
            hooks: { 
                beforeCreate: async (newUserData) => {
                    newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData; 
                },
                beforeUpdate: async (updatedUserData) => {
                    updatedUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return UpdatedUserData;
                },
            },
            sequelize, 
            timestamps: false,
            freezeTableName: true, 
            underscored: true, 
            modelName: 'users',
        }
        );

        module.exports = Users; 
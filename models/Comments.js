const {
    Model,
    DataTypes
} = require('Sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        Comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references: {
                model: 'posts',
                key: 'id',
            },
        },
        user_id: { 
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: { 
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize, 
        freezeTableName: true, 
        underscored: true, 
        timestamps: false, 
        modelName: 'comments',
    }
);

module.exports = Comments;
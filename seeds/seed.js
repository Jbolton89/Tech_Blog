const sequalize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('postData.json');
const sequelize = require('sequelize');
const Posts = require('../models/Posts');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); 

    const user = await User.bulkCreate(userData, {
        individualHooks:true, 
        returning: true,
    });

    for (const posts of postData) {
        await Posts.create({
            ...posts,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
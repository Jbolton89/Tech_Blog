// const sequelize = require('../config/connection');
// const { Users, Posts } = require('../models');
// // 
const userData = require('./usersData.json');
const postData = require('./postsData.json');

const sequelize = require('../config/connection');
// const sequelize = require('sequelize');
const Posts = require('../models/Posts');
const Users = require('../models/Users');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); 

    const user = await Users.bulkCreate(userData, {
        individualHooks:true, 
        returning: true,
    });

    for (const posts of postData) {
        await Posts.create({
            ...posts,
            user_id: userData[Math.floor(Math.random() * userData.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
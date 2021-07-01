const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');
// const Comments = require('./Comments');

Users.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Posts.belongsTo(Users, {
  foreignKey: 'user_id',
});

Users.hasMany(Comments, { 
  foreignKey: 'user_id', 
  onDelete: 'CASCADE',
});

Comments.belongsTo(Users, { 
    foreignKey: 'user_id', 
    // onDelete: 'cascade',
}); 

Posts.hasMany(Comments, { 
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
}); 

Comments.belongsTo(Posts, { 
    foreignKey: 'post_id',
    // onDelete: 'CASCADE',
});


module.exports = { Users, Posts, Comments };
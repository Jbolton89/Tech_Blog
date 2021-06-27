const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comments');
const Comments = require('./Comments');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, { 
    foreignKey: 'user_id', 
    onDelete: 'cascade',
}); 

User.hasMany(Comments, { 
    foreignkey: 'user_id', 
    onDelete: 'cascade',
});

Post.hasMany(Comment, { 
    foreignKey: 'post_id',
    onDelete: 'cascade',
}); 

Comment.belongsTo(Post, { 
    foreignKey: 'post_id',
    onDelete: 'cascade',
});


module.exports = { User, Post, Comment };
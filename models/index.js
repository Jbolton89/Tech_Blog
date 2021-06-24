const User = require('./Users');
const Post = require('./Posts');
const Comment = require('./Comments')

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
}); 

User.hasMany(Comment, { 
    foreignkey: 'user_id', 
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, { 
    foreignKey:'user_id',
    onDelete: 'CASCADE'
}); 

Comment.belongsTo(Post, { 
    foreignKey: 'user_id'
});


module.exports = { User, Post, Comment };
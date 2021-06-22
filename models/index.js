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

Post.hasMany(Comment, { 
    foreignKey:'user_id',
    onDelete: 'CASCADE'
}); 

Comment.belongsTo(Post, { 
    foreignKey: 'user_id'
})

User.hasMany(Comment, { 
    foreignkey: 'user_id', 
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, { 
    foreignKey: 'user_id',
    onDelete: 'CASCADE' 
}); 

module.exports = { User, Post, Comment };
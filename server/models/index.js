const User = require('./user');
const Message = require('./Message');
const Conversation = require('./Conversation');
const Post = require('./post');
//associations
User.hasMany(Message,{foreignKey:"sender_id", as:'sendingMessage'});
User.hasMany(Message,{foreignKey:"receiver_id",as:'receivedMessages'});
Message.belongsTo(User,{foreignKey:'sender_id',as:'the sender'});
Message.belongsTo(User,{foreignKey:'receiver_id',as:'the receiver'});
Conversation.belongsToMany(User,{through:'Userconversation'});
User.belongsToMany(Conversation,{through:'Userconversation'});
Message.belongsTo(User);
Conversation.hasMany(Message);
Post.belongsTo(User);
User.hasMany(Post);

module.exports = {User, Message, Conversation, Post};
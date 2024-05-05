const User = require('./user');
const Message = require('./Message');
const Conversation = require('./Conversation');
//associations
User.hasMany(Message,{foreignKey:"sender_id", as:'sending Message'});
User.hasMany(Message,{foreignKey:"receiver_id",as:'receiver message'});
Message.belongsTo(User,{foreignKey:'sender_id',as:'the sender'});
Message.belongsTo(User,{foreignKey:'receiver_id',as:'the receiver'});
Conversation.belongsToMany(User,{through:'Userconversation'});
User.belongsToMany(Conversation,{through:'Userconversation'});
Message.belongsTo(User);
Conversation.hasMany(Message);

module.exports = {User, Message, Conversation};
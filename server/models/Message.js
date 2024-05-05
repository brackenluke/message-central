const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');
// creating model for message structure
class Message extends Model{}
//initiate model
Message.init({
    text:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    sender_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    receiver_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Conversation_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName:'Message',
});

module.exports = Message;
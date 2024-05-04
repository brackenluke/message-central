const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');
// creating model for message structure
class Message extends Model{}
//initiate model
Message.init({
    conversation_id:{
        type: DataTypes.STRING,
    },
    sender:{
        type:DataTypes.STRING,
    },
    text:{
        type: DataTypes.STRING,
    }
},
{
    sequelize,
    timestamps: true,
    freezeTableName: false,
});

module.exports = Message;
const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');

class Conversation extends Model{};

Conversation.init({
    members:{  //collects users in array
        type:DataTypes.ARRAY,
        allowNull:false,
    }
},
{
    sequelize,
    timestamps: true,
})

module.exports = Conversation;
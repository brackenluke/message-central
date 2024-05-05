const {Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');

class Conversation extends Model{};

Conversation.init({
    names:{
        type:DataTypes.ARRAY,
        allowNull:false,
    }
},
{
    sequelize,
    timestamps:true,
})

module.exports = Conversation;
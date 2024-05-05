const { Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');

class Post extends Model{};

Post.init({
    User_ID:{
        type:DataTypes.STRING,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull:false,
    }
},
{
    sequelize,
    timestamps:true,
})
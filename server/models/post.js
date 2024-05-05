const { Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');

class Post extends Model{};

Post.init({
   
    content:{
        type: DataTypes.TEXT,
        allowNull:false,
    },
    User_ID:{
        type:DataTypes.INTEGER,
    },
},
{
    sequelize,
    timestamps:true,
    modelName:'Post',
})

module.exports = Post;
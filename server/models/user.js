const { Model, DataTypes} = require('sequelize');
const Sequelize = require('../Config/Connection');

class User extends Model{};

User.init({
    
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail: true,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len:[8],
        }
    },
    profile_picture:{
        type:DataTypes.STRING,
        allowNull:true,
    },


},
{
    hooks:{
        beforeCreate: async(newUserData)=>{
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
    },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName:'User',
})

module.exports = User;
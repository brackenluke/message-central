const {Message} = require('../models');
const Sequelize = require('../Config/Connection');
const seedMessages = async()=>{
   await Sequelize.sync({force:true})
    await Message.bulkCreate([
    {
        text:'Hello there',
        sender_id: 1,
        receiver_id: 2,
        conversation_id:1
    },
    {
        text:'Hi,how are you?',
        sender_id: 2, 
        receiver_id:1, 
        conversation_id:1
    },
    {
        text:'Hey, I am stalking you',
        sender_id:3, 
        receiver_id:1,
        conversation_id:2
    }
    ])
}
seedMessages();

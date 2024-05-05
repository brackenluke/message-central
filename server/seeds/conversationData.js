const Sequelize = require('../Config/Connection');
const {Conversation} = require('../models');
// create conversation seed
const seedConversations = async()=>{
    await Sequelize.sync({ force: true });
    await Conversation.bulkCreate([
        {name:'Conversation 1'},
        {name:'Conversation 2'},
        {name:'Conversation 3'},
    ])
}
seedConversations();

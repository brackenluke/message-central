const Sequelize = require('../Config/Connection');
const {Post} = require('../models');
const seedPost = async()=>{
    await Sequelize.sync({force:true})
    await Post.bulkCreate(
        [
            {
                Content:'content from post 1',
                User_id: 1,
            },
            {
                Content:'content from post 2',
                User_id: 1,
            },
            {
                Content:'content from post 3',
                User_id: 2,
            }
        ]
    )
}
seedPost();

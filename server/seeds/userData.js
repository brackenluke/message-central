const Sequelize = require('../Config/Connection');
const {User} = require('../models');

const userData = async ()=>{
    await sequelize.sync({ force: true });
    await User.bulkCreate(
        [
            {
                username: 'Paul Bilbatua',
                email:'paul_bilbatua@hotmail.com',
                password:'uAevNKg8IR4Nex2pbu',
                profile_picture:''
            },
            {
                username: 'Luke Bracken',
                email:'',
                password:'tUmxi2dIvK2M9J4Ool',
                profile_picture:''
            },
            {
                username: 'Ethan Landeros',
                email:'landerosethan@gmail.com',
                password:'txTuPSste4CiJIW7v1',
                profile_picture:''
            },
        ]
    )
} 

userData();

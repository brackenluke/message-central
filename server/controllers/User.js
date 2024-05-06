const router = require('express').Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
// User logging in restrictions
router.post('/login',async (req,res)=>{
    try{
        // find email from user
        const userData = await User.findByPk({where:{email:req.body.email}});
        if(userData !== true){
            res.status(400).json("either email or password are not correct, try again!");
            return;
        }
        //find password if exists
        req.body.password = await bcrypt.hash(req.body.password);
        const validatePassword = await userData.checkForPassword(req.body.password);
        if(checkForPassword !== true){
            res.status(400).json({message:"either email or password are incorrect, please try again!"});
            return;
        }
        //save session from user
        req.session.save(()=>{
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({message:"You are now logged in"});
        })
    }catch(error){
        res.status(500).json("internal server error");
    }
});
// create account for new users
router.post('signUp',async(req,res)=>{
    try{
const [User, created] = await User.findOrCreate({
    where:{
      email: req.body.email,
    },
    defaults:{
        username:req.body.username,
        email: req.body.email,
        password:req.body.password,
    }
})
if(created !== true){
res.status(400).json({message:"bad request,user already exists"});
}
res.status(201).json({message:"User has been successfully created"})
}catch(error){
    res.status(500).json("internal server error");
}
});
//update user profile
router.put('/updateProfile',async(req,res)=>{
    try{
        const updateProfile = await User.update(
            {
                picture:req.body.profile_picture,
                username: req.body.username,
                email: req.body.email 
            },
            {
                where:{id:req.body.user_id}
            }
        )
    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
})
// update only picture profile
router.put('/update-picture',async(req,res)=>{
    try{
        updatePic = await User.update({

        })
    }catch(error){

    }
});
//display user profile
router.get('/profile/:userId',async(req,res)=>{

});

// User logging out restrictions
router.post('/logout',async(req,res)=>{

    if(req.session.logged_in){
        req.session.destroy(()=>{
        res.status(204).end();
        })
        } else{
            res.status(404).end();
        }
})

module.exports = router;
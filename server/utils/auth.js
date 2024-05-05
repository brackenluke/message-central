//autorize users accessing messaging app
const withAuth = (req,res,next)=>{
    if(req.session.log !== true){
        res.redirect('/login');
    } else{
        next();
    }
}

module.exports = withAuth;
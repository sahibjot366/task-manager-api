const jwt=require('jsonwebtoken');
const User=require('../models/user');
const auth=async (req,res,next)=>{
    try {
        const token=req.header('Authorization').replace('Bearer ','');
        const decode=await jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findOne({_id:decode._id,'tokens.token':token});
        if(!user){
            throw new Error("User doesn't exist!");
        }
        req.token=token;
        req.user=user;
        next();
    } catch (error) {
        res.send("Unable to authenticate :(")
    }
}
module.exports=auth;
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Task=require('./task')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("Age can't be negative!")
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email provided!");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'user_id'
})
userSchema.methods.toJSON=function(){
    const user=this;
    const userObj=user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    delete userObj.avatar;
    return userObj;
}
userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens=[...user.tokens,{token}];
    await user.save();
    return token;

}
userSchema.pre('remove',async function(next){
    const user=this;
    await Task.deleteMany({user_id:user._id});
    next()
})
userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error('User not found!');
    }
    else{
        const isMatched=await bcrypt.compare(password,user.password);
        if(isMatched){
            console.log('logged in')
            return user;
        }
        else{
            throw new Error('Wrong Password!')
        }
    }
}
userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);
    }
    next()
})

const User=mongoose.model('User',userSchema);

module.exports=User;
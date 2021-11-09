

const mongoose = require('mongoose')
const validator=require('validator');
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
//     useNewUrlParser: true
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required:true,
//         trim:true
//     },
//     age: {
//         type: Number,
//         default:0,
//         validate(value){
//             if(value<0){
//                 throw new Error("Age can't be negative");
//             }
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//         lowercase:true,
//         lowercase:true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid!')
//             }
//         }
//     },
//     password:{
//         type:String,
//         required:true,
//         trim:true,
//         validate(value){
//             if(value.length<7){
//                 throw new Error('Password length should be atleast 7 characters!')
//             }
//             if(value.includes("password")){
//                 throw new Error('Your password should not include password phrase in it!')
//             }
//         }
//     }
// })

// const me = new User({
//     name: 'Sahib',
//     age:20,
//     email:'Sahib@gmail.com     ',
//     password:'indiazindabad'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{useNewUrlParser:true});
// const Task=mongoose.model('Tasks',{
//     description:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     completed:{
//         type:Boolean,
//         default:false
//     }
// })

// const firstTask=new Task({
//     description:"     do pentesting         ",
//     completed:true
// })

// firstTask.save().then(task=>{
//     console.log(task);
// }).catch(error=>{
//     console.log(error);
// })
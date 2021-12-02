const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User=require('../src/models/user')
const Task=require('../src/models/task')
const userOneId=new mongoose.Types.ObjectId()
const userOne={
    _id:userOneId,
    name:"Virat",
    email:'virat@kohli.com',
    password:'run_machine',
    age:33,
    tokens:[{
        token:jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}

const userTwoId=new mongoose.Types.ObjectId();
const userTwo={
    _id:userTwoId,
    name:"Dhoni",
    email:'dhoni@dhoni.com',
    password:'captain_cool',
    age:40,
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}
const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:'task 1',
    completed:false,
    user_id:userOneId
}
const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:'task 2',
    completed:true,
    user_id:userOneId
}
const taskThree={
    _id:new mongoose.Types.ObjectId(),
    description:'task 3',
    completed:false,
    user_id:userTwoId
}
const setupDatabase=async ()=>{
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports={
    userOne,
    userOneId,
    setupDatabase,
    taskOne,
    userTwo
}
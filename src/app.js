const express=require('express');
const mongoose=require('mongoose');
const taskRouter=require('./routers/task.js');
const userRouter=require('./routers/user.js');


const app=express();
app.use(express.json())
app.use(taskRouter);
app.use(userRouter);

const mongoUri=process.env.MONGODB_URL;

  mongoose.connect(mongoUri, {
    useNewUrlParser: true
  });
module.exports=app;

const express=require('express');
const mongoose=require('mongoose');
const taskRouter=require('./routers/task.js');
const userRouter=require('./routers/user.js');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const app=express();
const port=process.env.PORT;

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true});


app.use(express.json())
app.use(taskRouter);
app.use(userRouter);



app.listen(port,()=>{
    console.log("Server running on port "+port+"...");
})


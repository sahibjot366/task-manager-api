const express=require('express');
const mongoose=require('mongoose');
const taskRouter=require('./routers/task.js');
const userRouter=require('./routers/user.js');


const app=express();
const port=process.env.PORT;
app.use(express.json())
app.use(taskRouter);
app.use(userRouter);

const mongoUri=process.env.MONGODB_URL;
// mongoose.connect(mongoUri,{useNewUrlParser:true});
if (!mongoUri) {
    throw new Error(
      `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
    );
  }
  mongoose.connect(mongoUri, {
    useNewUrlParser: true
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance");
  });
  mongoose.connection.on("error", (err) => {
    console.error("Error connecting to mongo", err);
  });




app.listen(port,()=>{
    console.log("Server running on port "+port+"...");
})


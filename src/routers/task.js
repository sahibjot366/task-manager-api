const Task=require('../models/task.js');
const express=require('express');
const taskRouter=new express.Router();
const auth=require('../middlewares/auth')

taskRouter.post('/task',auth,async (req,res)=>{
    const task=new Task({...req.body,user_id:req.user._id});

    try {
        await task.save();
        res.status(201).send();
    } catch (error) {
        res.status(400).send();
    }
})
taskRouter.get('/tasks',auth,async (req,res)=>{
    try {
        let tasks=[]
        if(!req.query.completed && !req.query.search){
            tasks=await Task.find({user_id:req.user._id});
        }else if(req.query.completed && !req.query.search){
            tasks=await Task.find({user_id:req.user._id,completed:req.query.completed==='true'});
        }else if(!req.query.completed && req.query.search){
            tasks=await Task.find({user_id:req.user._id});
            tasks=tasks.filter(task=>task.description.includes(req.query.search))
        }else{
            tasks=await Task.find({user_id:req.user._id,completed:req.query.completed==='true'});
            tasks=tasks.filter(task=>task.description.includes(req.query.search))
        }
        res.send(tasks);
    } catch (error) {
        res.status(500).send();
    }

    // try {
    //     await req.user.populate('tasks').execPopulate().then(tasks=>{
    //         console.log(tasks);
    //     }).catch(err=>{
    //         console.log(err)
    //     });
    //     // res.send(req.user.tasks);
    // } catch (error) {
    //     res.status(500).send(); 
    // }
})
taskRouter.patch('/task/:id',auth,async (req,res)=>{
    const _id=req.params.id; 
    const askedUpdates=Object.keys(req.body);
    const allowedUpdates=['description','completed'];
    const isValid=askedUpdates.every(update=>allowedUpdates.includes(update));
    if(!isValid){
        return res.status(400).send();
    }
    try {
        const task=await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        if(task.user_id.toString()!==req.user._id.toString()){
            return res.status(400).send('Action not allowed!')
        }
        askedUpdates.forEach(update=>{
            task[update]=req.body[update];
        })
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send();
    }
})
taskRouter.delete('/task/:id',auth,async (req,res)=>{
    const _id=req.params.id;
    try {
        const task=await Task.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        if(task.user_id.toString()!==req.user._id.toString()){
            return res.status(400).send('Action not allowed!')
        }
        await task.remove();
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports=taskRouter;
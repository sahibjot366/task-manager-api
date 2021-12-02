const mongoose=require('mongoose');
const Task=require('../src/models/task');
const {userOne,taskOne,setupDatabase, userTwo}=require('./db')
const app=require('../src/app')
const request=require('supertest')

beforeEach(setupDatabase)

test('should create a new task',async ()=>{
    await request(app).post('/task')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description:'hello',
        completed:false
    }).expect(201);
})

test('should get all tasks of user 1',async ()=>{
    const response=await request(app).get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
    console.log(response.body)
    expect(response.body.length).toBe(2);
})

test('user 2 should not be able to delete task of user 1',async ()=>{
    await request(app).delete(`/task/${taskOne._id}`)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(400);
    const task=await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})
const request=require('supertest');
const app=require('../src/app')
const User=require('../src/models/user')
const {userOne,userOneId,setupDatabase}=require('./db')

beforeEach(setupDatabase);
test('add a new user',async ()=>{
    const response=await request(app).post('/users').send({
        name:"Faltu_kam",
        email:"faltukam7189@gmail.com",
        password:"Faltu@123"
    }).expect(201);
    const user=await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    expect(response.body).toMatchObject({
        user:{
            name:'Faltu_kam',
            email:'faltukam7189@gmail.com'
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe('Faltu@123')
})
test('should login a user',async ()=>{
    const response=await request(app).post('/user/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200);
    const user=await User.findById(userOneId);
    expect(user).not.toBeNull()
    expect(response.body.token).toBe(user.tokens[1].token)
})
test('should not login',async ()=>{
    await request(app).post('/user/login').send({
        email:'virat@virat.com',
        password:'run_machine'
    }).expect(400)
})
test('should give user profile',async ()=>{
    await request(app).get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('should not give user profile',async ()=>{
    await request(app).get('/users/me')
    .send()
    .expect(400)
})
test("should delete user's account",async ()=>{
    await request(app).delete('/user/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    const user=await User.findById(userOneId)
    expect(user).toBeNull()
})
test("should not delete user's account",async ()=>{
    await request(app).delete('/user/me')
    .send()
    .expect(400)
})
test('should save avatar',async ()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .attach('avatar','tests/fixtures/testPic.png')
    .expect(200)
    const user=await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
})
test('Should  update valid user fields',async ()=>{
    await request(app).patch(`/users/me`)
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'vk'
    }).expect(400);
})
test('should not update invalid property',async ()=>{
    await request(app).patch(`/users/me`)
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'jalandhar'
    }).expect(400);
})
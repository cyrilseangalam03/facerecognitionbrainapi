const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Cypogi23',
    database : 'smart-brain'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

//ROOT
app.get('/', (req, res)=>{
	res.send(database.users);
})
//SIGN IN
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt) });
//REGISTER
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) })
//PROFILE AND ID
app.get('/profile/:id',(req, res) => {profile.handProfileGet(req, res, db)})
//IMAGE INPUT
app.put('/image',(req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)})


app.listen(3000, ()=> {
	console.log('app is running on port 3000');
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = new user
/profile/:userId --> GET = user
/image --> PUT --> user
*/
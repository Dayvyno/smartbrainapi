import express from 'express';
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from 'knex';
import {handleRegister} from './controllers/register.js';
import { handleSignIn } from './controllers/signin.js';
import { profileHandler } from './controllers/profile.js';
import { handleApiCall, imageHandler } from './controllers/image.js';



const app = express()
app.use(cors())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db= knex({
  client: 'pg',
  connection: {
    connectString : process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get("/", (req, res)=>{
  res.send('App has been confirmed working')
})

app.post("/signin", handleSignIn(db, bcrypt));
app.post('/register', (req, res) =>handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res)=>profileHandler(req, res, db));
app.put('/image', (req, res)=>imageHandler(req, res, db));
app.post('/imageUrl', (req, res)=>handleApiCall(req, res))

app.listen(process.env.PORT || 2000, ()=>console.log(`app is running on port ${process.env.PORT}`))
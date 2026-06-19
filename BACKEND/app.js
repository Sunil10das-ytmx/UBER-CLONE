const dotenv = require('dotenv');
dotenv.config(); 
const cors= require('cors');

const express = require('express');
const app = express();
const connectDatabase = require('./DATABASE/DataBase.connect.js')
const userRoutes=require('./ROUTES/user.routes.js')
const cookieParser = require('cookie-parser')

connectDatabase();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('hello world');
})

app.use('/users',userRoutes);

module.exports = app;
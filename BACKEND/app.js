const dotenv = require('dotenv');
dotenv.config(); 
const cors= require('cors');

const express = require('express');
const app = express();
const connectDatabase = require('./DATABASE/DataBase.connect.js')

app.use(cors())
connectDatabase();


app.get('/',(req,res)=>{
    res.send('hello world');
})

module.exports = app;
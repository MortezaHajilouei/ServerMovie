require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const core = require('cors');
const busboy = require('connect-busboy');

const home = require('./route/Movie');
const pic = require('./route/Image');
const person = require('./route/Person');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.DBURL,{useNewUrlParser:true});
const db = mongoose.connection;

db.on('error',(err) => console.error(err));
db.once('open',() => console.log('db opened.'));

app.use(busboy()); 
app.use(core());
app.use('/movie',home);
app.use('/pic',pic);
app.use('/person',person);
app.use(express.json());
app.listen(4000,()=> console.log('server started!'));
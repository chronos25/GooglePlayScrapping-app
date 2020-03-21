const express = require('express'),
 path = require('path'),
 cookieParser = require('cookie-parser'),
 logger = require('morgan'),
 gplay = require('google-play-scraper'),
 assert = require('assert'),
 mongoose = require('mongoose'),
 listRouter = require('./routes/listRouter'),
 detailRouter = require('./routes/detailRouter'),
 url = 'mongodb://localhost:27017/googleplayscrapping',
 app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', listRouter);
app.use('/app', detailRouter);

const options = {
  useNewUrlParser : true
}

const connect = mongoose.connect(url,options,(err,client)=>{  
  assert.equal(null,err);
  console.log("Connected Sucessfully to DB");
  
});



  module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var listRouter = require('./routes/listRouter');
var detailRouter = require('./routes/detailRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', listRouter);
app.use('/app', detailRouter);

var gplay = require('google-play-scraper');
 
gplay.list({
    category: gplay.category.APPLICATION,
    collection: gplay.collection.TOP_FREE,
    num: 2
  })
  .then(console.log, console.log);

  module.exports = app;

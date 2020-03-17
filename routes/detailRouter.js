var express = require('express');
var scraper = express.Router();
var gplay = require('google-play-scraper');
 

scraper.route('/appdetails?')
.get((req,res,next)=>{
  console.log(req.query.pkg);
  gplay.app({appId: req.query.pkg})
  .then((data)=>{
    res.send(data);
  });
});


module.exports = scraper;
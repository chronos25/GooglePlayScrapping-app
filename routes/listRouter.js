var express = require('express');
var scraper = express.Router();

var gplay = require('google-play-scraper');

/* GET home page. */
scraper.route('/apps')
.get((req, res, next) =>{ 
  
  console.log(req.route);
  gplay.list({
    category: gplay.category.APPLICATION, 
    collection: gplay.collection.TOP_FREE,
    num: 15
})
.then((data)=>{
  res.json(data);
});

})

.post((req,res,next)=>{

});



module.exports = scraper;

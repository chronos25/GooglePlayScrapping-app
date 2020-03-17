var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 

  gplay.list({
    category: gplay.category.APPLICATION, 
    collection: gplay.collection.TOP_FREE,
    num: 15
})
.then(console.log, console.log);

});

module.exports = router;

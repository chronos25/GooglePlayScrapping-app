const express = require('express'),
      scraper = express.Router(),
      gplay = require('google-play-scraper'),
      appDetail = require('../models/detail');
 

scraper.route('/appdetails?')
.get((req,res,next)=>{
  console.log(req.query.pkg);
  let query = 
  {"appId":req.query.pkg};
  appDetail.findOne(query).then((data)=>{
      res.status(200);
      res.setHeader('Content-Type','application/json');
      res.json(data);
    },(err)=>{next(err);})
    .catch((err)=>{
        next(err);
    });
})

.put((req,res,next)=>{ 
  if(req.query.pkg)
   { gplay.app({appId: req.query.pkg})
       .then((data)=>{   

                    let appDetails = new appDetail({
                    appId: req.query.pkg,
                    title: data.title,
                    description: data.description,
                    icon: data.icon,
                    headerImage: data.headerImage,
                    score: data.score,
                    developer: data.developer,
                    video: data.video,
                    screenShots: {
                      0: data.screenshots[0],
                      1: data.screenshots[1],
                      2: data.screenshots[2],
                      3: data.screenshots[3],
                      4: data.screenshots[4]
                    }
                })
                  appDetails.save(data).then((app)=>{
                      console.log("RECEIVED DATA");
                      console.log(app);
                      
                  },(err)=>next(err))
                  .catch((err)=>{
                      console.log(err);
                      next(err);
                  });
              res.status(200); 
              res.json({success:true});
             },(err)=>next(err)).catch((err)=>{
           console.log("Error");
           next(err);
       })
    }
})
 
.delete((req,res,next)=>{
    appDetail.remove({})
    .then((result)=>{
      res.status(200);
      res.setHeader('Content-Type','application/json');
      res.json(result);
    },(err)=>next(err))
    .catch((err)=>{
      console.log("Delete Error");
      next(err);
    })
})

module.exports = scraper;
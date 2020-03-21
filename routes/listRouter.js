const express = require('express'),
 scraper = express.Router(),
 assert = require('assert'),
 gplay = require('google-play-scraper'),
 list = require('../controller/getLists'),
 appList = require('../models/list');
scraper.route('/apps')
.get((req, res, next) =>{ 
     list.find({}).then((applist)=>{
         res.statusCode = 200;
         res.setHeader('Content-Type','application/json');
         res.json(applist);
     },(err)=>next(err))
     .catch((err)=>next(err));
})

.post((req,res,next)=>{
    let val=2;
    appData = {};
    gplay.list({
        category: gplay.category.APPLICATION, 
        collection: gplay.collection.TOP_FREE,
        num: 15
    })
    .then((data)=>{
        appData = data.json();
  }).catch((err)=>{console.log(err);});
  console.log(appData);
  
//   dataLength = 15;
//   for(i=0;i<dataLength;i++)
//  {
//      let appsList = new appList({
//          title: data[i].title,
//          appId: data[i].appId,
//          icon: data[i].icon,
//          score: data[i].score,
//          developer: data[i].developer
//      });
//      appsList.save(data[i]).then((app)=>{
//          console.log("data saved");
//          val = 1;
//          Object.assign(app,appData);
//          console.log(app);
         
//      }).catch((err)=>{
//          console.log('Facing Error');
//          val=0;
//          next(err);
//     })
//   } 
//   res.status = 200;
//   res.setHeader('Content-Type','application/json');
//   res.json(appData);
})

.put((req,res,next)=>{
    list.find({}).then((applist)=>{
        gplay.list({
            category: gplay.category.APPLICATION, 
            collection: gplay.collection.TOP_FREE,
            num: 15
        })
        .then((data)=>{
            for(i=0;i<15;i++){
            }
      }).catch((err)=>{console.log(err);});
    })
})


module.exports = scraper;

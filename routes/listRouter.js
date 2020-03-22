const express = require('express'),
 scraper = express.Router(),
 assert = require('assert'),
 gplay = require('google-play-scraper'),
 list = require('../controller/getLists'),
 appList = require('../models/list');

scraper.route('/')
.get((req, res, next) =>{ 
     appList.find({}).then((applists)=>{
         res.status = 200;
         res.setHeader('Content-Type','application/json');
         res.json(applists);
     },(err)=>next(err))
     .catch((err)=>next(err));
})

.post((req,res,next)=>{
    result= {val:0}
    appData = {};
    gplay.list({
        category: gplay.category.APPLICATION, 
        collection: gplay.collection.TOP_FREE,
        num: 15
    })
    .then((data)=>{
        dataLength = 15;
        for(i=0;i<dataLength;i++,result.val+=1)
       {
           let appsList = new appList({
               title: data[i].title,
               appId: data[i].appId,
               icon: data[i].icon,
               score: data[i].score,
               developer: data[i].developer
           });
           
           appsList.save(data[i]).then((app)=>{
               console.log("RECEIVED DATA");
                res.status = 200;
               
           },(err)=>next(err))
           .catch((err)=>{
               console.log(err);
               next(err);
           });
       }
    },(err)=>next(err)).catch((err)=>{
        console.log("Error");
        next(err);
    })
      res.setHeader('Content-Type','application/json');
      res.json(result);
})

// .put((req,res,next)=>{
//     list.find({}).then((applist)=>{
//         gplay.list({
//             category: gplay.category.APPLICATION, 
//             collection: gplay.collection.TOP_FREE,
//             num: 15
//         })
//         .then((data)=>{
//             for(i=0;i<15;i++){
//             }
//       }).catch((err)=>{console.log(err);});
//     })
// })

.delete((req,res,next)=>{
    appList.remove({}).then((result) =>{
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

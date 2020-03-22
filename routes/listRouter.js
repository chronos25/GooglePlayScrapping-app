const express = require('express'),
 scraper = express.Router(),
 assert = require('assert'),
 gplay = require('google-play-scraper'),
 list = require('../controller/getLists'),
 appList = require('../models/list');
scraper.route('/')
.get((req, res, next) =>{ 
     appList.find({}).then((applists)=>{
         console.log(
            Object.keys(applists).length);
         
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
           },(err)=>next(err))
           .catch((err)=>{
               console.log(err);
               next(err);
           });
       }
      res.status = 200;
      res.setHeader('Content-Type','application/json');
      res.json(result);
    },(err)=>next(err)).catch((err)=>{
        console.log("Error");
        next(err);
    })
})

.put((req,res,next)=>{   
    appList.find({}).then((applist)=>{
        
        lastIndex = Object.keys(applist).length;
        gplay.list({
            category: gplay.category.APPLICATION, 
            collection: gplay.collection.TOP_FREE,
            num: lastIndex+1
        })
        .then((data)=>{ 
            // for(i=0;i<lastIndex;i++)
            // {
                // console.log(lastIndex);
                 console.log(applist[lastIndex-1].title);
                 console.log(data[lastIndex].title);
                
                if(applist[lastIndex-1].title!=data[lastIndex].title)
                {
                    let appsList = new appList({
                        title: data[lastIndex].title,
                        appId: data[lastIndex].appId,
                        icon: data[lastIndex].icon,
                        score: data[lastIndex].score,
                        developer: data[lastIndex].developer
                    });
                    
                    appsList.save(data[lastIndex]).then((app)=>{
                        console.log("RECEIVED DATA");
                    },(err)=>next(err))
                    .catch((err)=>{
                        console.log(err);
                        next(err);
                    });
                }
           // }
            res.status(200);
            res.setHeader('Content-Type','application/json');
            res.json({success:true});

      }).catch((err)=>{console.log(err);});
    })
})

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

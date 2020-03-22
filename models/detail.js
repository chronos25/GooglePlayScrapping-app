const mongoose = require('mongoose'),
schema = mongoose.Schema;

const shots = new schema({
    0:{
        type:String
    },
    1:{
        type:String
    },
    2:{
        type:String
    },
    3:{
        type:String
    },
    4:{
        type:String
    }
});

const detailSchema = new schema({
    title:{
        type: String,
        required:true
    },
    appId:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true
    }, 
     icon:{
        type: String,
        required:true
    },
    headerImage:{
        type:String,
        required:true
    },
     score :{
        type: String,
        required:true
    },
    developer:{
        type: String,
        required:true
    },
    video:{
        type: String,
        required:true
    },
    screenShots:[shots]
},{
    timestamps:true
});

var detailsSchema = mongoose.model('detailsSchema',detailSchema);
module.exports = detailsSchema;

const mongoose = require('mongoose'),
schema = mongoose.Schema;

const listSchema = new schema({
    title:{
        type: String,
        required:true
    },
     appId:{
        type: String,
        required:true
    }, 
     icon:{
        type: String,
        required:true
    },
     score :{
        type: String,
        required:true
    },
    developer:{
        type: String,
        required:true
    }
},{
    timestamps:true
});

var listsSchema = mongoose.model('listsSchema',listSchema);
module.exports = listsSchema;
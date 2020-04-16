const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    path:{
        type:String,
        required:true
    },
    contentType:{
        type:String
    },
    modefiedTime:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports = mongoose.model('Image',imageSchema);


const mongoose = require('mongoose')

var imageSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    img: { 
        data: Buffer, 
        contentType: String
    },
    modefiedTime:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports = mongoose.model('Image',imageSchema);


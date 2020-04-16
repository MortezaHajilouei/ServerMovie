const mongoose = require('mongoose')

const directorSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    type:{
        type:String
    },
    cover:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image'
    },
    modefiedTime:{
        type:Date,
        required:true,
        default:Date.now
    }
});

module.exports = mongoose.model('Person',directorSchema);


const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rate:{
        type:String
    },
    year:{
        type:String
    },
    genre:{
        type:String
    },
    detail:{
        type:String
    },
    modefiedTime:{
        type:Date,
        required:true,
        default:Date.now
    },
    reviews:[
        {
            name:{
                type:String
            },
            text:{
                type:String,
                required:true
            }
            
        }
    ],
    directors:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Person'
        }
    ],
    actors:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person'
        }
    ],
    cover:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Image'
    }
});

module.exports = mongoose.model('movie',movieSchema);


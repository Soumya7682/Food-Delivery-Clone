const mongoose = require('mongoose');

const foodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodpartner"
    },
        likeCount: {
            type: Number,
            default: 0
        },
    saves: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
})
const foodModel=mongoose.model("food",foodSchema);
module.exports=foodModel;

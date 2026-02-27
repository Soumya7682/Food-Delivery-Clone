const mongoose = require('mongoose');

const foodpartnersSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },contactName:{
        type:String,
        required:true

    },phoneNumber:{
        type:String,
        required:true
    },
     address:{
        type:String,
        required:true
     },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})
const foodpartnersModel = mongoose.model("foodpartner", foodpartnersSchema);
module.exports = foodpartnersModel;

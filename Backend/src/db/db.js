const mongoose=require('mongoose');


function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongo Conncetion");
    }).catch((err)=>{
        console.log("mongoDB Connection Error:",err);
    })
} module.exports=connectDB;
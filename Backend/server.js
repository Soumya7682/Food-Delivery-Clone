require('dotenv').config();
const app=require('./src/app');

const connectDB=require('./src/db/db');
connectDB();
console.log("Mongo URL:", process.env.MONGODB_URL);

const port=3000;
app.listen(port,()=>{
    console.log(`Server is Running on ${port}`);
})
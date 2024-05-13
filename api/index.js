import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.DATABASE_STRING);
mongoose.connect(process.env.DATABASE_STRING).then(()=>{
    console.log("Connected");
}).catch((error)=>{
    console.log(error);
});
const app=express();

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})
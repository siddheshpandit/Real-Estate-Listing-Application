import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect(process.env.DATABASE_STRING,{
    dbName:'RealEstate-Listing'
}).then(()=>{
    console.log("Connected");
}).catch((error)=>{
    console.log(error);
});
const app=express();
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(cookieParser());
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

//  Middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const errMessage = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        errMessage,
    })
})
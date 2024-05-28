import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
export const test = (req,res)=>{
    res.json({
        message:'Hello World'
    })
}

export const updateUser = async (req, res, next) => {
    const { username, password: plainPassword, email, avatar } = req.body;
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'Forbidden'));
    try {
        const updatedData={};
        if(plainPassword){
            updatedData.password = bcryptjs.hashSync(plainPassword,10);
        }
        if (username) updatedData.username = username;
        if (email) updatedData.email = email;
        if (avatar) updatedData.avatar = avatar;
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:updatedData},{new:true})
        const {password,...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
    }
}
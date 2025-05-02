import mongoose from "mongoose";
import { Schema } from "mongoose";

 const userSchema= new Schema({

    name:{
        type:String,
        required :true,
        lowercase:true,
    },
    email:{
        type: String,
        unique:true,
    },


    password:{
        type:String,
        required :true,
    },
   
    phone:{
        type:Number,
        required :true,
        unique:true
    },
   
},{
    timestamps:true,
})
export const userModel=mongoose.model('user',userSchema)
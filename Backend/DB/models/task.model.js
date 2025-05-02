import mongoose from "mongoose";
import { Schema } from "mongoose";
const taskSchema=new Schema({
    title:{
      type :String,
      required:true,
     unique:true
    },
    description:{
        type :String,
        required:true,
      },
     
      deadline:{
        type :Date,
        required:true,  
         
      },
      status:{
       type:String,
       enum:['pending','inprogress','completed'],
       default:'pending'
      },
     userid:{
      type:Schema.Types.ObjectId,
      ref:'user'
     },
   
},
{
    timestamps:true,
})
export const taskModel=mongoose.model('task',taskSchema)

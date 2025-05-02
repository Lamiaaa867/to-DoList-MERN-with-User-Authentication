import mongoose from "mongoose";

export const conectionDB=async()=>{
    return await mongoose
    .connect(process.env.connection_url)
   
    .then((res)=>{console.log("conncted to To-DoList DB")},)
    .catch((err)=>{console.log("fail to connect to trello DB",err)})
    
}


export const asyncHandler=(API)=>{
    return(req,res,next)=>{
        API(req,res,next).catch((error)=>{
            console.log(error)
         return res.status(500).json({message:"fail",error})
        })
    }
}

import joi from "joi";
export const validationForUpdateUserData={
    user:joi.object({
        _id:joi.string().required(),
    }).required(),

    body:joi.object({
        name:joi.string().required(),
         phone:joi.number().min(8).required(),
    })
    .required(),
  
   
}
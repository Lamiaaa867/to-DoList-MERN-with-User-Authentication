import joi from 'joi'
export const signUpSchema={
    body:joi.object({
        name:joi.string().min(3).max(10).required(),
        email:joi.string().email({tlds:{allow:['com','net','org']}}).required(),
       password:joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
       
        phone:joi.number().min(8).required(),
        tasks:joi.array(),
    })
}
export const logInValidationSchema={
    body:joi.object({
        email:joi.string().email({tlds:{allow:['com','net','org']}}).required(),
        password:joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
    })
}


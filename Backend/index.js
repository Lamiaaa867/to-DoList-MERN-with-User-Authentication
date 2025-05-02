import express from 'express' 
import * as routes from './src/routes.js'
import cors from 'cors'

import cookieParser from 'cookie-parser';
import { conectionDB } from './DB/connection.js';
import { config } from 'dotenv';
config()
const app= express();

conectionDB()
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
      origin: `http://localhost:${process.env.FRONT_PORT}`,
      methods: ["GET", "POST", "DELETE","PUT" ,"PATCH"],
      
      credentials: true,
    })
  );
app.use ('/auth',routes.authRouter)
app.use ('/user',routes.userRouter)
app.use ('/task',routes.taskRouter)

app.listen(process.env.port,()=>{
    console.log("server is runing")
})
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import userouters from './routes/userLogRouter.js'
dotenv.config()

//mongod --dbpath ~/.mongo
const app=express();
app.use(express.json())
app.use(cors())
app.use(userouters)




const PORT=process.env.PORT || 3000
app.listen(PORT, ()=>console.log('rodando'));
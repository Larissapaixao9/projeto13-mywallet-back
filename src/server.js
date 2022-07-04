import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import userouters from './routes/userLogRouter.js'
import userInforouters from './routes/userinfosRouter.js'
dotenv.config()

//mongod --dbpath ~/.mongo
const app=express();
app.use(express.json())
app.use(cors())
app.use(userouters)
app.use(userInforouters)

// {
//     "value":14,
//     "description":"12345"
// }


// {
//     "email"::"l@a.com",
//     "password":"12345"
// }

const PORT=process.env.PORT || 3027
app.listen(PORT, ()=>console.log('rodando'));
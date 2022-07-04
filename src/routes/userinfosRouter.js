import express from 'express';
import { getCashFlow, postCashflow } from '../controllers/userInfosController.js'
import validateUser from '../middlewares/validateUser.js';


const router=express.Router()

router.get('/home',validateUser,getCashFlow)
router.post('/home',validateUser,postCashflow)


export default router
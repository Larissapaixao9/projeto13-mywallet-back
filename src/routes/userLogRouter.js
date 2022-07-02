import express from 'express';
import { userLogin, userLogup} from '.././controllers/userController.js'

const router=express.Router()
//rotas responsaveis pelo login e cadastro
router.post('/login',userLogin);
router.post('/logup',userLogup);

export default router
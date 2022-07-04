import express from 'express'
import bcrypt from 'bcrypt'
import joi from 'joi'
import { db } from '../dbStrategy/mongo.js'
import authSchema from '../validations/validation_schema.js'
import authSchema2 from '../validations/validation_schema2.js'
import { v4 as uuid } from 'uuid' //é um dos algoritmos q a bibliote usa p/ gerar string unica
const router=express.Router();

export  async function userLogin(req,res){
    const { email, password } = req.body;
    const theUser=req.body

    try{
        const result=await authSchema2.validateAsync(req.body);
        console.log(result);

        const all_users= await db.collection('walletUsers').find().toString();
        const findUser=await db.collection('walletUsers').findOne({ email: email })

        //verifica se o email está cadastrado
        if(!findUser){
            return res.status(404).send("usuario ainda não foi cadastrado")
        }
        
        //compara a senha digitada com a senha criptografada no banco de dados
        const verifyPassword=bcrypt.compareSync(password, findUser.password)

        if(!verifyPassword){
            return res.status(401).send('senha ou email incorreto')
        }
        
        const token=uuid()
        console.log(token)
        await db.collection('sessions').insertOne({
            token,
            userId:findUser._id,
        })
        const { user } = findUser

        //enviando token ao usuario
        return res.status(201).send({ token, ...findUser }) 
    }

    catch(err){
        console.log(err);
        return res.status(422).send('erro no login')
    }

}

export  async function userLogup(req,res){
    const user=req.body;

    const { password, confirm } = user

    try{
        //valida com Joi
        const result=await authSchema.validateAsync(req.body)
        console.log(result)

        // criptografa a senha
        const CryptPassword = bcrypt.hashSync(user.password, 10) 

        //verifica se as senhas digitadas são iguais
        if(password!=confirm){
            return res.status(404).send('as senhas não são iguais')
        }

        //adiciona usuario no banco de dados
        await db.collection("walletUsers").insertOne(
            {
                ...user,
                password:CryptPassword,
                confirm:CryptPassword
            }
            );
        res.status(201).send('usuario cadastrado')
    }

    catch(err){
        res.status(422).send('deu ruim')
        console.log(err)
        return;
    }

}

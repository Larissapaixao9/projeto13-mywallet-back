import express from 'express'
import bcrypt from 'bcrypt'
import joi from 'joi'
import { db, objectId } from '../dbStrategy/mongo.js'
import authSchema3 from '../validations/validation_schema3.js'
import dayjs from 'dayjs'

export async function getCashFlow(req,res){
    const session = res.locals.session;


    const userPosts=await db.collection('posts').find({ userId: new objectId(session.userId) }).toArray()
    console.log(userPosts)
    // const total = await db.collection('total').findOne({name:'total'});
    // console.log(total)
    //return res.send({userPosts, total})
    return res.send(userPosts)
}


export  async function postCashflow(req,res){
    const post=req.body;
    const { value, description }= post
    const { authorization }=req.headers
    const token=authorization?.replace('Bearer ','')
    let now=dayjs().locale('pt-br').format("HH:MM:SS");
    const newValue=parseFloat(value.replace(',', '.')).toFixed(2)


    try{
        //valida com Joi
        const result= authSchema3.validateAsync(req.body)
        console.log(result)

        const session=await db.collection('sessions').findOne( {token} )

        // if(!session){
        //     return res.status(401).send('token invalido. Voce não tem autorização para ver os dados do usuario')
        // }

        //adiciona entrada/saida no banco de dados
       // await db.collection("total").updateOne({name:'total'},{$set:{total:total+value}});
        await db.collection("posts").insertOne(
            {
                ...post,
                userId: session.userId,
                value:Number(value),
                now
            }
            );
        return res.status(201).send('post cadastrado')
    }

    catch(err){
        res.status(422).send('deu ruim')
        console.log(err)
        return;
    }

}


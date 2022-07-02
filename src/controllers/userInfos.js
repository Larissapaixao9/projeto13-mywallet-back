import express from 'express'
import bcrypt from 'bcrypt'
import joi from 'joi'
import { db, objectId } from '../dbStrategy/mongo.js'

export async function getCashFlow(req,res){
    const { authorization }=req.headers
}
import Joi from 'joi'

const authSchema1=Joi.object().keys({
    name:Joi.string().required().trim(),
    email:Joi.string().email().required().trim(),
    password:Joi.string().required(),
    confirm:Joi.string().required()
    
})

export default authSchema1
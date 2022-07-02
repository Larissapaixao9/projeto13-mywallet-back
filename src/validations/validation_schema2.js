import Joi from 'joi'

const authSchema2=Joi.object().keys({
    email:Joi.string().email().required().trim(),
    password:Joi.string().required().trim()  
})

export default authSchema2
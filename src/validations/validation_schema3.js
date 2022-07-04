import Joi from 'joi'

const authSchema3=Joi.object().keys({
    value:Joi.number().required(),
    description:Joi.string().required().trim()  
})

export default authSchema3
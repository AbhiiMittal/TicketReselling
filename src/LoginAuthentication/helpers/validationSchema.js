const joi = require('joi');
const authSchema = joi.object({
    email : joi.string().email().lowercase().required(),
    password : joi.string()
})

module.exports = {
    authSchema
}
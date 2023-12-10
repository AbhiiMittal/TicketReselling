const jwt = require('jsonwebtoken')
const createErrors = require('http-errors');


module.exports = {
    signAccessToken: (user)=>{
        return new Promise((reject,resolve)=>{
            const payload = {
                name : "Abhishek"
            }
            const key = "super imp"
            const options = {}
            jwt.sign(payload,key,options,(err,token)=>{
                if(err){ reject(err)}
                resolve(token)
            })
        })
    }
}
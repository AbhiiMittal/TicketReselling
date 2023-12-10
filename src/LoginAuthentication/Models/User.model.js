const mongoose = require('mongoose')
const Schema =mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email:{
        type : String,
        lowercase : true,
        required : true,
        unique : true
    },
    password : {
        type  : String,
        required : true
    }
})


userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})


const user = mongoose.model('user',userSchema);
module.exports = user;
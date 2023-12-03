const mongoose = require('mongoose')
const schema =mongoose.schema;


const userSchema = new schema({
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

const user = mongoose.model('user',userSchema);
module.exports = user;
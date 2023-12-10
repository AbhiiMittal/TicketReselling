const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/MongoDbConnection')

const auth = require('../routes/Authentication')
const app =express();
const port = process.env.PORT;
app.use(morgan('dev'))
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello World")
    res.status(200);
})


app.use('/auth', auth)

app.use(async(req,res,next)=>{
    next(createError.NotFound("Route does not exist"));
})



app.use(async(err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error : {
            status : err.status || 500,
            message : err.message
        },
    })
})




app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})
const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/MongoDbConnection')

const app =express();
const port = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.send("Hello World")
    res.status(200);
})

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
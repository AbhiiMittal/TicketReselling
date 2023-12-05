const express = require('express')
const router = express.Router();
const createErrors=require('http-errors');
const user = require('../LoginAuthentication/Models/User.model');
router.post('/register',async (req,res,next)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password) throw createErrors.BadRequest();
        const alreadyRegistered = await user.findOne({email : email});
        if(alreadyRegistered) throw createErrors.Conflict(`${email} already registered`);
        const User = new user({email,password});
        const saveUser = await user.save();
        res.send('Saved user');
    } catch (error) {
        next(error)
    }
})
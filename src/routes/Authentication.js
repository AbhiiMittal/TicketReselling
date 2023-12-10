const Joi = require("joi");
const express = require("express");
const router = express.Router();
const createErrors = require("http-errors");
const {
  authSchema,
} = require("../LoginAuthentication/helpers/validationSchema");
const user = require("../LoginAuthentication/Models/User.model");
const {signAccessToken} = require('../LoginAuthentication/helpers/jwtHelpers')



router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body); //checking if both are correct

    // if (!result.email || !result.password)
    //   throw createErrors.BadRequest(`Enter email and password both`);

    const alreadyRegistered = await user.findOne({ email: result.email });
    if (alreadyRegistered)
      throw createErrors.Conflict(`${result.email} already registered`);

    const User = new user(result);
    const saveUser = await User.save();
    const accessToken = await signAccessToken(saveUser.id)
    res.send(accessToken);
  } catch (error) {
    console.log(error)
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
});

module.exports = router;

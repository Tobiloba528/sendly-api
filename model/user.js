const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign(
      { _id: this._id, firstname: this.firstname },
      config.get("jwtPrivateKey")
    );
    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;

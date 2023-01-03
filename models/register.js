const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this.id, isAdmin: this.isAdmin },
    process.env.JWT
  );
  return token;
};
const Register = mongoose.model("Register", userSchema);

function validate(userData) {
  const schema = Joi.object({
    firstName: Joi.string().min(3),
    lastName: Joi.string().min(3),
    email: Joi.string().min(3).email(),
    password: Joi.string().min(3),
    confirmPassword: Joi.string().min(3),
  });
  return schema.validate(userData);
}
exports.validate = validate;
exports.Register = Register;

const mongoose = require("mongoose");
const Joi = require("joi");

const Register = mongoose.model(
  "Register",
  new mongoose.Schema({
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
  })
);

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

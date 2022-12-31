const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "customers",
  new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isGold: { type: Boolean, required: true },
    phone: { type: String, required: true },
  })
);
function validate(customer) {
  //validation
  const schema = Joi.object({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    phone: Joi.string().required().min(2),
    isGold: Joi.boolean().required(),
  });
  return schema.validate(customer);
}
exports.validate = validate;
exports.Customer = Customer;

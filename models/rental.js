const mongoose = require("mongoose");
const Joi = require("joi");
const Rentals = mongoose.model(
  "Rentals",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: { type: String, required: true },
        isGold: { type: Boolean, required: false },
        phone: { type: String, required: true },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        titie: { type: String, required: true },
        dailyRentalRate: { type: Number, required: true },
      }),
      required: true,
    },
    dateOut: { type: Date, required: true, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Date, min: 0 },
  })
);
function validate(rental) {
  //validation
  const schema = Joi.object({
    customerId: Joi.string().required().min(2),
    movieId: Joi.string().required().min(2),
    // dateOut: Joi.date().min(2),
    // dateReturned: Joi.date().min(2),
    // rentalFee: Joi.date().min(2),
  });
  return schema.validate(rental);
}
exports.validate = validate;
exports.Rentals = Rentals;

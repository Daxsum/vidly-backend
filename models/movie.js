const mongoose = require("mongoose");
const Joi = require("joi");
const { GenreSchema } = require("./genre");
const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: GenreSchema, required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true },
  })
);
function validate(movie) {
  //validation
  const schema = Joi.object({
    title: Joi.string().required().min(2),
    genreId: Joi.string().required().min(2),
    numberInStock: Joi.number().required().min(2),
    dailyRentalRate: Joi.number().required().min(2),
  });
  return schema.validate(movie);
}
exports.validate = validate;
exports.Movies = Movie;

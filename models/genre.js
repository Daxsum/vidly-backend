const mongoose = require("mongoose");
const Joi = require("joi");
const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const Genre = mongoose.model("Genre", GenreSchema);
function validate(genre) {
  //validation
  const schema = Joi.object({
    name: Joi.string().required().min(2),
  });
  return schema.validate(genre);
}
exports.validate = validate;
exports.Genre = Genre;
exports.GenreSchema = GenreSchema;

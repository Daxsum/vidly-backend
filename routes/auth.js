const _ = require("lodash");

const Joi = require("joi");

const bcrypt = require("bcrypt");
const express = require("express");
const { Register } = require("../models/register");
const router = express.Router();

router.post("/login", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  let user = await Register.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password.");
  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password.");
  const token = user.generateAuthToken();
  res.send(token);
});
function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).email(),
    password: Joi.string().min(3),
  });
  return schema.validate(req);
}
module.exports = router;

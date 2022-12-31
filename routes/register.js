const _ = require("lodash");
const express = require("express");
const { validate, Register } = require("../models/register");
const router = express.Router();

router.post("/register", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  let user = await Register.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered.");
  const UserRegister = new Register(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
    ])
  );
  // const UserRegister = new Register({
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   email: req.body.email,
  //   password: req.body.password,
  //   confirmPassword: req.body.confirmPassword,
  // });
  await UserRegister.save();
  res.send(_.pick(UserRegister, ["id", "firstName", "lastName", "email"]));
});
module.exports = router;

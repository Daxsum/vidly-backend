const express = require("express");
const mongoose = require("mongoose");
const { Customer, validate } = require("../models/customer");
const router = express.Router();

router.get("/customerGet", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});
/// get specfic customer api end-point
router.get("/customerGet/:id", async (req, res) => {
  //validation of if the the id of that genre is exist or not
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(400).send("customer not found with provided id");
  }
  //validation complite so sending the requested genre
  res.send(customer);
});
// add new genre in to the array api end-point
router.post("/customerAdd", async (req, res) => {
  //validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  //add the genre in to the mongo

  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();
  //send the genre back
  res.send(customer);
});
// updating specfic genre
router.put("/customerUpdate/:id", async (req, res) => {
  // validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  // const genre = genresList.find((g) => g.id === parseInt(req.params.id));
  if (!customer) {
    return res.status(400).send("customer not found with provided id");
  }
  res.send(customer);
});
//deleteing specfic genre api end-point
router.delete("/customerDelete/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    return res.status(400).send("customer not found with provided id");
  }

  res.send(customer);
});
module.exports = router;

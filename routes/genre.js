const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
//// get all the genres api end-point
router.get("/genresGet", async (req, res) => {
  const genreList = await Genre.find().sort("name");
  res.send(genreList);
});
/// get specfic genre api end-point
router.get("/genreGet/:id", async (req, res) => {
  //validation of if the the id of that genre is exist or not
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    return res.status(400).send("genre not found with provided id");
  }
  //validation complite so sending the requested genre
  res.send(genre);
});
// add new genre in to the array api end-point
router.post("/genresAdd", auth, async (req, res) => {
  //validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  //add the genre in to the mongo

  const genre = new Genre({
    name: req.body.name,
  });
  await genre.save();
  //send the genre back
  res.send(genre);
});
// updating specfic genre
router.put("/genresUpdate/:id", async (req, res) => {
  // validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  // const genre = genresList.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    return res.status(400).send("genre not found with provided id");
  }
  res.send(genre);
});
//deleteing specfic genre api end-point
router.delete("/genresDelete/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if (!genre) {
    return res.status(400).send("genre not found with provided id");
  }

  res.send(genre);
});
module.exports = router;

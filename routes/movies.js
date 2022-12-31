const express = require("express");
const router = express.Router();
const { validate, Movies } = require("../models/movie");
const { Genre } = require("../models/genre");

router.get("/movies", async (req, res) => {
  const moviesList = await Movies.find().sort("title");
  res.send(moviesList);
});
/// get specfic genre api end-point
router.get("/movies/:id", async (req, res) => {
  //validation of if the the id of that genre is exist or not
  const movie = await Movies.findById(req.params.id);

  if (!movie) {
    return res.status(400).send("movie not found with provided id");
  }
  //validation complite so sending the requested genre
  res.send(movie);
});
// add new genre in to the array api end-point
router.post("/movieAdd", async (req, res) => {
  //validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  //add the genre in to the mongo
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genre");

  const movie = new Movies({
    title: req.body.title,
    genre: {
      name: genre.name,
      id: genre.id,
    },

    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();
  //send the genre back
  res.send(movie);
});
// updating specfic genre
router.put("/movieUpdate/:id", async (req, res) => {
  // validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid genre");
  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        name: genre.name,
        id: genre.id,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  // const genre = genresList.find((g) => g.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(400).send("movie not found with provided id");
  }
  res.send(movie);
});
//deleteing specfic genre api end-point
router.delete("/movieDelete/:id", async (req, res) => {
  const movie = await Movies.findByIdAndDelete(req.params.id);

  if (!movie) {
    return res.status(400).send("movie not found with provided id");
  }

  res.send(movie);
});
module.exports = router;

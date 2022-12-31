const { validate, Rentals } = require("../models/rental");
const { Movies } = require("../models/movie");
const { Customer } = require("../models/customer");
const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

router.get("/rentalsGet", async (req, res) => {
  const rentalsList = await Rentals.find().sort("-dateOut");
  res.send(rentalsList);
});
/// get specfic genre api end-point
router.get("/rentalGet/:id", async (req, res) => {
  //validation of if the the id of that genre is exist or not
  const rental = await Rentals.findById(req.params.id);

  if (!rental) {
    return res.status(400).send("rental not found with provided id");
  }
  //validation complite so sending the requested genre
  res.send(rental);
});
// add new genre in to the array api end-point
router.post("/rentalAdd", async (req, res) => {
  //validation
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }
  if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    return res.status(500).send("unknown customer");
  if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
    return res.status(500).send("unknown movie");
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("invalid customer");
  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("invalid movie");
  if (movie.numberInStock == 0)
    return res.status(400).send("there is no movie in stock for rent");

  const rental = new Rentals({
    customer: {
      id: customer.id,
      name: customer.firstName,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      id: movie.id,
      titie: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental.save();
  movie.numberInStock--;
  await movie.save();
  //send the genre back
  res.send(rental);
});
// // updating specfic genre
// router.put("/movieUpdate/:id", async (req, res) => {
//   // validation
//   const result = validate(req.body);
//   if (result.error) {
//     return res.status(404).send(result.error.details[0].message);
//   }
//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("invalid genre");
//   const movie = await Movies.findByIdAndUpdate(
//     req.params.id,
//     {
//       title: req.body.title,
//       genre: {
//         name: genre.name,
//         id: genre.id,
//       },
//       numberInStock: req.body.numberInStock,
//       dailyRentalRate: req.body.dailyRentalRate,
//     },
//     { new: true }
//   );
//   // const genre = genresList.find((g) => g.id === parseInt(req.params.id));
//   if (!movie) {
//     return res.status(400).send("movie not found with provided id");
//   }
//   res.send(movie);
// });
// //deleteing specfic genre api end-point
// router.delete("/movieDelete/:id", async (req, res) => {
//   const movie = await Movies.findByIdAndDelete(req.params.id);

//   if (!movie) {
//     return res.status(400).send("movie not found with provided id");
//   }

//   res.send(movie);
// });
module.exports = router;

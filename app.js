const express = require("express");
const user = require("./routes/users");
const customer = require("./routes/items");
const movies = require("./routes/movies");
const rental = require("./routes/rentals");
const register = require("./routes/register");
const auth = require("./routes/auth");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://kalab:kalgoldenjet@axsumitequasar.zcbw5.mongodb.net/vidly"
  )
  .then(() => console.log("connected to mongoDb...."))
  .catch((err) => console.log("could not connect to mongoDb...", err));
const app = express();
app.use(express.json());
app.use("/api/user", user);
app.use("/api/customer", customer);
app.use("/api/movies", movies);
app.use("/api/register", register);
app.use("/api/rental", rental);
app.use("/api/auth", auth);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`hello i am listning at port ${port}....`);
});

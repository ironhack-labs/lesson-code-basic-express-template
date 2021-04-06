const express = require("express");
const router = express.Router();

// Require Movie model
const Movie = require("../models/Movie.model");

// Require fileUploader
const fileUploader = require("../configs/cloudinary.config");

// GET route to display all the movies
router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies-list", { movies: moviesFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
});

// GET route to display form for creating movie
router.get("/movies/create", (req, res, next) => res.render("movie-create"));

// POST route for saving a new movie in db
// Image upload example
router.post(
  "/movies/create",
  fileUploader.single("image"),
  (req, res, next) => {
    const { title, description } = req.body;

    Movie.create({ title, description, imageUrl: req.file.path })
      .then(() => res.redirect("/movies"))
      .catch((err) => console.log(`Error while creating a new movie: ${err}`));
  }
);

// GET route for querying a specific movie from db and pre-filling the edit form
router.get("/movies/:id/edit", (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movieToEdit) => res.render("movie-edit", movieToEdit))
    .catch((err) =>
      console.log(`Error while getting a single movie for edit: ${err}`)
    );
});

// POST route to save changes after updates
router.post(
  "/movies/:id/edit",
  fileUploader.single("image"),
  (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = req.body.existingImage;
    }

    Movie.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
      .then(() => res.redirect("/movies"))
      .catch((err) =>
        console.log(`Error while updating a single movie: ${err}`)
      );
  }
);

module.exports = router;

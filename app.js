const express = require("express");
const PhotoFilters = require("./util/photoFilters");
const BodyParser = require("body-parser");
const multer = require("multer");
const uploader = multer({ dest: "uploads/" });
// EDIT HERE: Create a multer uploader singleton here

const app = express();
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(BodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
	res.render("form");
});

/* --- START EDITING HERE --- */

// Use the uploader singleton to make a middleware that checks for the
// "image" field to be a file that is uploaded, and add it to the POST.
//
// Once you've done that, and req.file is properly being sent, send the file
// through to PhotoFilters.makePhotos(). It takes in `req.file` as its one and
// only argument.
//
// PhotoFilters.makePhotos() returns a promise, so on resolve, you'll want to
// redirect to /gallery. On catch, you'll want to re-render the form with an
// `error` argument (The same `error` that catch gets)
app.post("/", uploader.single("image"), function(req, res) {
	res.send("I haven't been made yet!");
});

// The /gallery page will need a query param from the post request to pass to
// PhotoFilters.getPhotos(), as it expects the `req.file.filename` from the post
// request as its one and only parameter. It will return a promise that resolves
// with an array of URLs for you to send to the "gallery" view as an "images"
// variable. If there is no query param, or the promise catches, you'll want to
// render the "404" view instead.
app.get("/gallery", function(req, res) {
	res.send("I haven't been made yet!");
});

/* --- STOP EDITING HERE --- */

app.get("*", function(req, res) {
	res.status(404).render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Codestagram is available at http://localhost:" + port);
});

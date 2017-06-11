const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const folder = "assets/filtered/";

// Helper function to make paths for the filtered images, i.e.
// assets/filtered/somefilename_blur.jpg
function getDest(img, file, name) {
	return path.resolve(folder + file.filename + "_" + name + ".jpg");
}

module.exports = {
	makePhotos: function(file) {
		// Make sure they passed a file in the first place
		if (!file) {
			return Promise.reject(new Error("No file provided"));
		}

		return Jimp.read(path.resolve(file.destination, file.filename))
			// First reduce the quality of the images, so that their file size is small
			.then(function(image) {
				return image.quality(80);
			})
			// Then make a new blur image and save it
			.then(function(image) {
				image.clone().blur(10).write(getDest(image, file, "blur"));
				return image;
			})
			// Then make a new greyscale image and save it
			.then(function(image) {
				image.clone().greyscale().write(getDest(image, file, "bw"));
				return image;
			})
			// Finally make a new sepia image and save it
			.then(function(image) {
				image.clone().sepia().write(getDest(image, file, "sepia"));
			});
	},

	getPhotos: function(filename) {
		return new Promise(function(resolve, reject) {
			// Check if the blur file exists, and if it does, we can assume
			// that the other filtered photos exist.
			fs.exists(path.resolve(folder, filename + "_blur.jpg"), function(found) {
				if (found) {
					// Resolve with an array of photo paths (What the src attr would be)
					resolve([
						"/filtered/" + filename + "_blur.jpg",
						"/filtered/" + filename + "_bw.jpg",
						"/filtered/" + filename + "_sepia.jpg",
					]);
				}
				else {
					// If it doesn't exist, reject with an error
					reject(new Error("No filtered photos for " + filename));
				}
			});
		});
	},
};

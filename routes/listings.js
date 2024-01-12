const express = require("express");
const router = express.Router();

const multer = require("multer");

const store = require("../store/listings.js");
// const categoriesStore = require("../store/categories");
const imageResize = require("../middleware/imageResize.js");
const listingMapper = require("../mappers/listings.js");

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

// const validateCategoryId = (req, res, next) => {
//   if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
//     return res.status(400).send({ error: "Invalid categoryId." });

//   next();
// };

router.get("/", (req, res) => {
  const listings = store.getListings();
  const resources = listings.map(listingMapper);
  // console.log(resources);
  resources.forEach((item) => {
    console.log(item?.images);

    item.image = item?.images[0]?.url;
  });

  res.send(resources);
});

const maxImageCount = 3;
router.post(
  "/",
  [upload.array("images", maxImageCount), imageResize],

  async (req, res) => {
    const listing = {
      title: req.body.title,
      price: parseFloat(req.body.price),
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
    };
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.body.location) listing.location = JSON.parse(req.body.location);
    if (req.user) listing.userId = req.user.userId;

    store.addListing(listing);

    res.status(201).send(listing);
  }
);

module.exports = router;

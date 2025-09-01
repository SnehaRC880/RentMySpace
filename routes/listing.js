const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn ,upload.single('listing[image]'),wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner,validateListing, upload.single('listing[image]'), wrapAsync(listingController.updateListing))
.delete(isOwner,isLoggedIn ,wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isOwner,isLoggedIn,wrapAsync(listingController.renderEditForm));


module.exports = router;











//index route
//router.get("/",wrapAsync(listingController.index));

//New Route
//router.get("/new",isLoggedIn, listingController.renderNewForm);

//Show Route ---printing data of individual list
//router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
//router.post("/",isLoggedIn ,validateListing,wrapAsync(listingController.createListing));

//Edit Route
//router.get("/:id/edit", isOwner,isLoggedIn,wrapAsync(listingController.renderEditForm));

//Update Route
//router.put("/:id",isLoggedIn, isOwner,validateListing,wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id",isOwner,isLoggedIn ,wrapAsync(listingController.destroyListing));

const express               = require('express');
const router                = express.Router();

const campgrounds           = require('../controllers/campgrounds')
const catchAsync            = require("../utils/catchAsync");
const {isLoggedIn, validateCampground, isAuthor}          = require("../middleware");

const multer    = require('multer');
const {storage} = require('../cloudinary');
const upload    = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))                                                 // INDEX ROUTE
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))     // CREATE ROUTE
    

router.get('/new', isLoggedIn, campgrounds.renderNewForm);                              // NEW ROUTE

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))                                        // SHOW ROUTE
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))                // UPDATE ROUTE
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))             // DELETE ROUTE

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))   // EDIT ROUTE

module.exports = router;
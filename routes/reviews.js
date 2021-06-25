const express                           = require('express');
const router                            = express.Router({mergeParams: true});
const {validateReview, isLoggedIn, isReviewAuthor}      = require("../middleware");

const reviews               = require("../controllers/reviews")
const catchAsync            = require("../utils/catchAsync");


// CREATE REVIEW
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// DELETE REVIEW
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
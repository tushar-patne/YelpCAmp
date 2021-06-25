const {campgroundSchema, reviewSchema}    = require("./schemas");
const ExpressError          = require("./utils/ExpressError");
const Campground            = require("./models/campground");
const Review                = require("./models/review")

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.query._method === 'DELETE' ? `/campgrounds/${req.params.id}` : req.originalUrl; //we retrive originalUrl in req.session.returnTo in order to use it in /login route logic so that instead of everytime rendering /campground we can render the /req.originalUrl i.e. where user wanted to go for which he has to login
        req.flash('error', 'You must be signed in first!')
        return res.redirect('/login')
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author._id.equals(req.user._id)){
        req.flash('error', 'You dont have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const {id, reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        req.flash('error', 'You dont have permission to do that');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}
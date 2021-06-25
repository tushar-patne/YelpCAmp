const User          = require('../models/user');

module.exports.renderRegister = async (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = new User({username, email});
        const registeredUser = await  User.register(user, password);
        req.login(registeredUser, (err) => {
            if(err) return next(err);
            req.flash('success', 'Welcome to YelpCamp')
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campgrounds';
    req.flash('success', 'Welcome back!');
    delete req.session.returnTo     // we need to delete this if we don't do it then even if we click on login itself instead of new campground or add campground we will go to /req.session.returnTo instead to /campgrounds
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds');
}


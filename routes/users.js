const express       = require('express');
const router        = express.Router();

const passport      = require('passport')
const User          = require('../models/user');
const users         = require('../controllers/users');
const catchAsync    = require('../utils/catchAsync');

router.route('/register')
    .get(users.renderRegister)                                                                              //RENDER NEW REGISTER FORM
    .post(users.register)                                                                                   //REGISTER NEW USER

router.route('/login')
    .get(users.renderLogin)                                                                                 //RENDER LOGIN FORM
    .post(passport.authenticate('local', { failureFlash: true , failureRedirect: '/login'}), users.login)   //LOGIN USER

router.get('/logout', users.logout)                                                                         //LOGOUT USER

module.exports = router

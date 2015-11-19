var express = require('express');
var passport = require('passport');
var router = express.Router();

var Contact = require('../models/contact');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

    // check if the user is logged in
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

/* Render Users main page. */
router.get('/', requireAuth, function (req, res, next) {
    Contact.find(function (err, contacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('contacts/index', {
                title: 'Contacts',
                contacts: contacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});


/* Render the Add Users Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('contacts/add', {
        title: 'Contacts',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new user */
router.post('/add', requireAuth, function (req, res, next) {
    var contact = new Contact(req.body);
    var hashedPassword = user.generateHash(user.password);
    User.create({
        businessEmail: req.body.businessEmail,
        businessName: req.body.businessName,
        provider: 'local',
        created: Date.now(),
        updated: Date.now()
    }, function (err, User) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/contacts');
        }
    });
});

module.exports = router;
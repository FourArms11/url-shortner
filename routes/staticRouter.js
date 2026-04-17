const express = require('express');
const URL = require('../models/url');
const router = express.Router();

// When a user asks for the homepage (http://localhost:3000/)
router.get('/', async (req, res) => {
    // We reach into the DB and fetch absolutely every single URL inside it
    const allurls = await URL.find({});
    
    // We send back the visual HTML file 'home.ejs', but we inject our database links into it under 'urls'
    return res.render('home', {
        urls: allurls, 
    });
});

// When a user clicks the Signup link (http://localhost:3000/signup)
router.get('/signup', (req, res) => {
    return res.render('signup'); // Send back the raw visual HTML Signup page
});

// When a user clicks the Login link (http://localhost:3000/login)
router.get('/login', (req, res) => {
    return res.render('login'); // Send back the raw visual HTML Login page
});

module.exports = router;
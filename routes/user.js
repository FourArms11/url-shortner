const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');
const router = express.Router();

// POST Route: When a user hits the physical 'Signup' button to make a brand new account!
router.post('/', handleUserSignup);

// POST Route: When a user hits the physical 'Login' button to sign back into an existing account!
router.post('/login', handleUserLogin);

module.exports = router;
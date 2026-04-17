const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleDeleteUserById } = require('../controllers/url');
const router = express.Router();

// POST Route: When the HTML form submits a new big URL to be shrunk down.
router.post('/', handleGenerateNewShortURL);

// GET Route: Secret endpoint to get raw JSON analytics regarding total clicks for a specific ID.
router.get('/analytics/:shortId', handleGetAnalytics);

// DELETE Route: Secret endpoint allowing external tools (like Postman) to delete a URL from the DB.
router.delete('/del/:shortId', handleDeleteUserById);

module.exports = router;

const express = require('express');
const { handleGenerateNewShortURL,handleGetAnalytics,handleDeleteUserById } = require('../controllers/url');
const router = express.Router();

router.post('/' ,  handleGenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

// console.log(handleGenerateNewShortURL);

router.delete('/del/:shortId', handleDeleteUserById );

module.exports = router;

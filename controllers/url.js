const shortid = require('shortid'); // Utility package that can generate random string IDs (like Yt67_plm)
const URL = require('../models/url'); // Mongoose blueprint for URLs

// This function shrinks big URLs down and saves them to the DB
async function handleGenerateNewShortURL(req, res) {
    const body = req.body; // Capture whatever the user typed into the HTML form
    
    // If they clicked submit but the input box was completely empty, complain and stop.
    if (!body.url) return res.status(400).json({ error: 'url is required' });
    
    // Use the shortid library to generate 8 random characters.
    const shortID = shortid();

    // Create a new data entry in MongoDB.
    await URL.create({
        shortId: shortID, 
        redirectURL: body.url, // The original massive URL they pasted
        visitHistory: [], // By default, nobody has clicked it yet
        createdBy: req.user._id, // Assign the ownership of this URL to the currently logged in user!
    });
    
    // Since we are returning them back to the 'home.ejs' dashboard, fetch all URLs again so the table doesn't disappear.
    const allurls = await URL.find({});
    
    // Serve the UI back to them with the freshly updated URL array injected in.
    return res.render('home', {
        id: shortID,
        urls: allurls,
    });
}

// Gives you raw JSON click analytics when queried from something like Postman API
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks: result.visitHistory.length, // Just counts how many times the array was stamped
        analytics: result.visitHistory 
    });
}

// Scans MongoDB for a specific ID and deletes the entry.
async function handleDeleteUserById(req, res) {
    const shortId = req.params.shortId;
    await URL.findOneAndDelete({ shortId });
    return res.json({ status: 'Success' });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleDeleteUserById,
};
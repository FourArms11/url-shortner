// ====== BUILT-IN & EXTERNAL PACKAGES ======
const express = require('express'); // Loads the Express framework to create our web server
const path = require('path'); // Node.js built-in module for working with file and directory paths
const cookieParser = require('cookie-parser'); // Middleware to read cookies sent by the browser

// ====== CUSTOM FILES & MIDDLEWARES ======
const { restrictToLoggedinUserOnly } = require('./middlewares/auth'); // Our custom security gatekeeper function
const urlRoute = require('./routes/url'); // Routes dealing with shortening URLs and deleting them
const userRoute = require('./routes/user'); // Routes dealing with user signup and login
const staticRoute = require('./routes/staticRouter'); // Routes dealing with rendering our visual HTML (EJS) pages
const URL = require('./models/url'); // The Mongoose Database model for URLs
const { connectToMongoDB } = require('./connect_db'); // Our custom function to connect to the database

// ====== SETUP EXPRESS ======
const app = express(); // Initializes the Express application
const PORT = 3000; // Defines the port number the server will run on (http://localhost:3000)

// ====== DATABASE CONNECTION ======
// Connects to local MongoDB under a database named "short-url". Logs to console when successful!
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDb connected successfully!'));

// ====== TEMPLATING ENGINE SETUP (EJS) ======
app.set('view engine', 'ejs'); // Tells Express to use EJS as the tool to generate dynamic HTML
app.set('views', path.resolve('./views')); // Tells Express exactly where our .ejs files live folder-wise

// ====== MIDDLEWARES (Runs on every request before hitting routes) ======
app.use(express.json()); // Allows our server to understand and parse incoming JSON data (like from Postman)
app.use(express.urlencoded({ extended: false })); // Allows our server to understand data submitted from standard HTML Forms
app.use(cookieParser()); // Intercepts raw cookies from the browser and turns them into a readable object (req.cookies)

// ====== ROUTE HANDLING (Traffic Controllers) ======

// Any request that targets standard frontend pages (like Home, Login, Signup) goes to staticRoute
app.use('/', staticRoute); 

// Any request that targets user accounts (like creating a user, or logging in) goes to userRoute
app.use('/user', userRoute);

// Any request starting with '/url' (like generating a short URL) goes to urlRoute.
// BUT, we placed 'restrictToLoggedinUserOnly' in the middle as a security guard! If you aren't logged in, it stops you.
app.use('/url', restrictToLoggedinUserOnly, urlRoute); 

// ====== CATCH-ALL REDIRECTION ROUTE ======
// This route sits at the very bottom. If a user tries to visit a short ID (like localhost:3000/ABc123), it gets caught here.
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId; // Extract the ID they typed in the URL
    
    // Find the URL document in Mongo where shortId matches, and simultaneously update its visitHistory by adding current time!
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                 timestamp: Date.now(),
            },
        },
    });

    // If the shortId doesn't exist in our database (or if the browser secretly requested favicon.ico), throw a 404 error instead of crashing.
    if (!entry) {
        return res.status(404).send('URL not found');
    }

    // It is a valid URL! Take their browser and physically redirect them to the original, massive URL they saved.
    res.redirect(entry.redirectURL);
});

// ====== START THE SERVER ======
app.listen(PORT, () => console.log(`Server started at PORT : http://localhost:${PORT}`));

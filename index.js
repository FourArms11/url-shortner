const express = require('express'); //Loads the Express framework to create a web server.
const path = require('path'); // Node.js built-in module to handle file/directory paths across OS platforms.
const app = express();//Creates your Express application instance — this is your actual server object.
const PORT = 3000; //Stores the port number your server will listen on.


//Imports your custom route handlers, Mongoose model, and DB connection function.
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const {connectToMongoDB} = require('./connect_db');
const userRoute = require('./routes/user')


//Connects to your local MongoDB database named short-url and logs on success.
connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('MongoDb connected!'));



// Tells Express to use EJS as the templating engine and points it to the /views folder for .ejs files.
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));//location of views




app.use(express.json()); //middleware Parses incoming JSON request bodies (e.g., from API calls / Postman)
app.use(express.urlencoded({extended: false })); //to support forms data Parses HTML form submissions



//Any request to /url/* is handed off to your urlRoute router.
app.use('/url', urlRoute);//This tells Express that **any request starting with `/url`** should be handled by your `urlRoute` router file.
//Root-level requests go to staticRoute (typically serves your home page).
app.use('/', staticRoute);

app.use('/user', userRoute)


//await pauses execution until the database query completes and returns the data

//Fetches all URL documents from MongoDB and renders the home.ejs view, passing the data as urls.
app.get('/test', async (req,res) => {
    const allUrls = await URL.find({});
    res.render('home', {
        urls : allUrls, //it attaches the data to an object called locals inside EJS.
//This passes allUrls to the template under the variable name urls
// Inside your home.ejs you can now loop over urls like:
    });
//     return res.end(`
//         <html>
//             <head>
//                 <body>
//                     <ol>
//                     ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
//                     </ol>
//                 </body>
//             </head>
//         </html>`);
})

app.get('/:shortId', async (req, res) => {
    const shortId =  req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: {
            visitHistory: {
                 timestamp: Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`server started at PORT : ${PORT} http://localhost:3000`));

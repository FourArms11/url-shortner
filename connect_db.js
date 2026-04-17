const mongoose = require('mongoose'); // Imports the official library to connect and talk to MongoDB

// An async function that tries to connect to the provided MongoDB database string
async function connectToMongoDB(url){
    return mongoose.connect(url);
}

// Export it so we can run it inside index.js
module.exports = {
    connectToMongoDB,
}

/*
Helpful Mongosh commands for beginners testing the Database:
- show dbs                (lists all databases)
- use short-url           (switches your terminal into this specific project database)
- show collections        (lists tables, e.g. 'urls' and 'users')
- db.urls.find().pretty() (shows all saved URLs nicely formatted)
- db.users.find().pretty()(shows all saved Users nicely formatted)
*/
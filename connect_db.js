const mongoose = require('mongoose');

async function connectToMongoDB(url){
    return mongoose.connect(url);
}

module.exports = {
    connectToMongoDB,
}



//mongosh
//show dbs
//use short-url
//show collections
//db.urls.find()
//db.urls.find().pretty()
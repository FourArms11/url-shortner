// A simple Map (Hashmap) that lives in the server's temporary RAM. 
// It secretly acts like a coat-check room. It pairs a giant random ID (Coat Check Ticket) with a specific user profile (The Coat).
// const sessionIdToUserMap = new Map();  //statefull



//stateless 
const jwt = require('jsonwebtoken'); 
const secret = 'Ishaan$123@$';





// A function to save a newly logged-in user into the Map
// function setUser(id, user) {         
//     return sessionIdToUserMap.set(id, user); // "Here is their Session ID, and here is exactly who they are."
// }
// A function to check the Map and see who the ID belongs to
// function getUser(id) {             
//     return sessionIdToUserMap.get(id); // "Who does this Session ID belong to?"
// }








//stateless 
//this functions will create tokens
function setUser(user) { 

    return jwt.sign({
        _id: user._id,
        email: user.email,
    },secret);
}


function getUser(token) {
    if(!token) return null;             
    return jwt.verify(token,secret);
}


module.exports = {
    setUser,
    getUser,    
};
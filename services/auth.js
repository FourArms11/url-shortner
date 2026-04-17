// A simple Map (Hashmap) that lives in the server's temporary RAM. 
// It secretly acts like a coat-check room. It pairs a giant random ID (Coat Check Ticket) with a specific user profile (The Coat).
const sessionIdToUserMap = new Map(); 

// A function to save a newly logged-in user into the Map
function setUser(id, user) {         
    return sessionIdToUserMap.set(id, user); // "Here is their Session ID, and here is exactly who they are."
}

// A function to check the Map and see who the ID belongs to
function getUser(id) {             
    return sessionIdToUserMap.get(id); // "Who does this Session ID belong to?"
}

module.exports = {
    setUser,
    getUser,    
};
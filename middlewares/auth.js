const { getUser } = require('../services/auth');

// This acts as an invisible Security Guard holding a clipboard. It runs BEFORE allowing access to restricted paths (like '/url').
async function restrictToLoggedinUserOnly(req, res, next) {

    // Look at the incoming request and try to read their 'uid' cookie (Their VIP string token).
    // Due to the 'cookie-parser' middleware inside index.js, this text is easily readable!
    const userUid = req.cookies?.uid;
    
    // Security Check #1: Did they even bring a cookie?
    // If they brought absolutely no cookie, immediately redirect them to the front door /login page.
    if (!userUid) return res.redirect('/login');

    // Look up their specific Cookie string inside our 'coat-check room' (Session Hashmap).
    const user = getUser(userUid);
    
    // Security Check #2: Is their cookie actually valid?
    // If the cookie string wasn't found (or the server restarted and the map wiped), immediately redirect to /login.
    if (!user) return res.redirect('/login');

    // SUCCESS! They proved they are a valid user.
    // We attach their entire User Identity object directly onto the 'req' object so our next operations know exactly who did it.
    req.user = user;
    
    // Tell Express "You may proceed to the actual route now. They are cleared."
    next(); 
};

module.exports = {
    restrictToLoggedinUserOnly,
}
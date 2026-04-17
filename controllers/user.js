const { v4: uuidv4 } = require('uuid'); // Utility package to generate highly secure random Session IDs
const User = require('../models/user'); // Mongoose blueprint for Users
const { setUser, getUser } = require('../services/auth'); // Functions to store/retrieve sessions in server memory

// This runs when someone submits the Signup form
async function handleUserSignup(req, res) {
    // Extract what they typed into the text boxes
    const { name, email, password } = req.body;
    
    // Force MongoDB to create a shiny new User object
    await User.create({
        name,
        email,
        password,
    });
    
    // Now that they have an account, smoothly bounce them over to the Login page so they can actually sign in
    return res.redirect('/login');
}

// This runs when someone submits the Login form
async function handleUserLogin(req, res) {
    // Extract their typed credentials
    const { email, password } = req.body;
    
    // Scour the MongoDB user table to find a document where BOTH email and password perfectly match what they typed
    const user = await User.findOne({ email, password });
    
    // If it totally fails (they mistyped, or don't exist), re-render the login page and show them an error message implicitly
    if (!user) return res.render('login', {
        error: "invalid username or password",
    });
    
    // SUCCESS! They proved who they are.
    // 1. Generate a massive secret token (e.g., 550e8400-e29b-41d4-a716-446655440000)
    const sessionId = uuidv4();
    
    // 2. Map this secret token strictly to their User database object in the server's brain (RAM)
    setUser(sessionId, user);
    
    // 3. Hand this secret token physically back to the browser and permanently store it as a Cookie named 'uid'
    res.cookie('uid', sessionId); 
    
    // 4. Finally, securely let them onto the homepage to start shrinking links!
    return res.redirect('/'); 
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
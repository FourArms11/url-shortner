# Node.js URL Shortener

A lightweight, full-stack URL shortener application built using **Node.js**, **Express**, **MongoDB**, and **EJS** for templating. 
This project was developed to practice fundamental backend concepts such as routing, model-view-controller (MVC) architecture, middleware integration, and user authentication.

## Features

- **User Authentication:** 
  - Users can sign up securely and log into their accounts using email & password.
  - Generates secure session cookies.
- **URL Shortening:** 
  - Converts lengthy, complex URLs into short, easy-to-share links (e.g., `http://localhost:3000/ncZSNMzlR`).
- **Redirection:** 
  - Catch-all dynamic routing seamlessly resolves shortened links and successfully forwards users back to the original destination. 
- **Analytics & History Tracking:** 
  - Automatically records click history and timestamps.
  - Renders a clean dashboard that previews chronological URL history and total link clicks.

## Tech Stack

- **Backend core:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **View Engine:** EJS (Embedded JavaScript)
- **Utilities:** `shortid` (for UID generation), `uuid` (for session tracking), `cookie-parser`

## Local Setup & Installation

**Prerequisites:** 
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed and active on your machine. Mongoose connects locally to `mongodb://127.0.0.1:27017/short-url`.

1. **Clone the repository and jump to the directory:**
   ```bash
   # Make sure you are inside the main folder
   ```
2. **Install the project dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   npm start
   # or
   node index.js
   ```
   *Your server will now be listening on `http://localhost:3000`.*

4. **Test it out!** 
   - Open your browser and navigate to `http://localhost:3000`. 
   - Since actions are restricted to verified users, please navigate to `http://localhost:3000/signup` or `/login` to use the application!

## Directory Structure
- `/controllers`: Contains business logic for both users and URL rendering.
- `/middlewares`: Custom authentication constraints built to restrict page access (`restrictToLoggedinUserOnly`).
- `/models`: Database Schemas for Mongo collections (`URL`, `User`). 
- `/routes`: Handles URL endpoints (`/`, `/user`, `/url`). 
- `/services`: Utility methods tying UIDs to Users for session flow.
- `/views`: Front-end EJS templates (`home.ejs`, `login.ejs`, `signup.ejs`).

## Acknowledgements
Inspired by Backend Web Development guides to master MVC workflow and database connection practices.

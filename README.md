```md
# Anime Tracker – Full-Stack Web Application

Anime Tracker is a full-stack web application that helps users keep track of the anime they are watching.  
Users can create an account, log in securely, and update their watching progress. All data is stored safely in a cloud database.

---

## Live Demo

* Frontend (Netlify): https://anime-tracker-api.netlify.app  
* Backend API (Render): https://anime-tracker-api-s0xh.onrender.com  

---

## What This Project Does

* Allows users to register and log in securely  
* Lets users add anime they are watching  
* Tracks season number, episode number, and watch status  
* Stores data permanently using a cloud-based MySQL database  
* Works on both desktop and mobile devices  

---

## Architecture Overview

The application follows a simple three-layer architecture:

Frontend (Netlify)
↓
Backend API (Node.js + Express on Render)
↓
Database (MySQL on Railway)

---

## Tech Stack

### Frontend
* HTML  
* CSS  
* Vanilla JavaScript  
* Deployed on Netlify  

### Backend
* Node.js  
* Express.js  
* JWT for authentication  
* bcrypt for password hashing  
* Deployed on Render  

### Database
* MySQL  
* Hosted on Railway  

---

## Features

* User registration and login  
* Secure authentication using JWT  
* Add anime with season, episode, and status  
* Update watching progress anytime  
* Delete anime entries  
* Data remains saved after refresh or logout  
* Secure handling of environment variables  
* Production-safe CORS configuration  

---

## Security and Best Practices

* Passwords are securely hashed using bcrypt  
* JWT is used to manage user sessions  
* Sensitive values are stored in environment variables  
* Database credentials are never committed to GitHub  
* API access is restricted to the frontend domain  

---

## Project Structure

backend/
├─ server.js
├─ db.js
├─ routes/
│   ├─ auth.routes.js
│   └─ anime.routes.js
└─ middleware/
      └─ auth.middleware.js

frontend/
├─ index.html
├─ login.html
├─ register.html
├─ js/
│   ├─ app.js
│   ├─ api.js
│   └─ auth.js
└─ css/
    └─ main.css

---

## Environment Variables

For local development, create a `.env` file with the following values:

DATABASE_URL=your_mysql_connection_url
JWT_SECRET=your_secret_key

Production environment variables are securely configured on Render.

---

## Testing Status

* Tested on desktop browsers
* Tested on mobile devices
* Verified data persistence after refresh
* Fully tested in the production environment

---

## Why This Project Matters

This project demonstrates real-world development skills such as:

* Building a complete full-stack application
* Working with cloud-hosted databases
* Implementing authentication and authorization
* Deploying applications to production
* Debugging real deployment and networking issues

---

## Author

**Sumith Reddy Gowra**
Full-Stack Developer (Student)

---

## License

This project was created for learning and portfolio purposes.

```

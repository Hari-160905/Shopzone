Shop Zone – Full Stack E-Commerce Website

A full-stack e-commerce web application built using HTML, CSS, JavaScript, Node.js, Express.js, and MySQL. The project provides a complete shopping experience with user authentication, product browsing, a shopping cart, and a contact page while demonstrating frontend, backend, and database integration.

Project Overview

Shop Zone allows users to register, log in, browse products, view trending items, add products to a shopping cart, and navigate through a responsive shopping interface. The backend handles user requests through Express.js, while MySQL stores user information and supports authentication.

Tech Stack  
Technology       Purpose
HTML             Page structure
CSS              Styling and responsive UI
JavaScript       Client-side functionality
Node.js          Backend runtime
Express.js       Server and routing
MySQL            Database

Features
User Registration
User Login Authentication
Home Page
Product Listing
Trending Products Section
Shopping Cart
Contact Page
Responsive User Interface
Backend API using Express.js
MySQL Database Integration

Project Structure
ShopZone/
│── public/
│   ├── main.html
│   ├── login.html
│   ├── register.html
│   ├── product.html
│   ├── trending.html
│   ├── cart.html
│   ├── contact.html
│   ├── index.js
│   ├── style.css
│   ├── product.css
│   └── sty.css
│
├── node_modules/
├── package.json
├── package-lock.json
├── server.js
└── README.md
How It Works

Users create an account through the registration page.
Login credentials are sent to the Express server.
The server validates the user using MySQL.
Authenticated users can browse products and access shopping features.
Users can view trending products and manage their shopping cart.
Installation
Prerequisites
Node.js
MySQL
npm

Clone the Repository
git clone https://github.com/Hari-160905/Shopzone.git
cd Shopzone
Install Dependencies
npm install
Configure MySQL

Create a MySQL database.
Create the required tables for user authentication.
Update your database credentials inside server.js or your configuration file.
Start the Server
node server.js

The application will run on:
http://localhost:3000
(Use the port configured in your project.)

Database
The application uses MySQL to store user information.
Example user table:
Column

Description
id
User ID
name
User Name
email	
Email Address
password
User Password

Screens
Home Page
Login Page
Registration Page
Product Page
Trending Products Page
Shopping Cart
Contact Page

Learning Outcomes
Through this project, I gained hands-on experience with:
Full-stack web development
Node.js and Express.js routing
MySQL database integration
User authentication
Client-server communication
Building responsive web interfaces

Future Improvements
Product search and filtering
Order management
Wishlist feature
Payment gateway integration
Admin dashboard
Password encryption using bcrypt
JWT-based authentication

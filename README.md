# Book Club

### Overview

This is a single page app to help manage the logistics of running a neighborhood book club. The members take turns to host the book club events. The main functionality includes registering to become a member, adding events, books, rsvp to events, rating books and posting news.

### Demo
[Click to view Demo](https://goto-forum.herokuapp.com/)

### Technologies used

* Node.js, Express, Multer, Body Parser, Morgan, Passport, Bcrypt
* MySQL, Sequelize
* React, Redux, React-Redux, Thunk, React Router
* React Developer Tools, Redux Developer Tools

### Challenges faced

* How to protect the client-side routes?
* How to protect api routes?
* How to upload image files to server?

### Solutions found

* Client-side routes can be protected by using a wrapper component inside the react routes which checks for authentication.
* Passport-local strategy authentication and jwt are used to protect api routes.
* Multer npm package is used to upload files to server and on the client side React dropzone component is used.

### How it works

* The existing users login and new users can sign up.

* The member can post news, create an event to host, rsvp to an existing event, rate the books in the library or edit his profile.


##### Developed by Bhagya, Chin-Long, Sandra Leal and Damilola

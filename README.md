[![Maintainability](https://api.codeclimate.com/v1/badges/d32912f0c6a037810aff/maintainability)](https://codeclimate.com/github/daviddamilola/Way-Farer-API/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/daviddamilola/Way-Farer-API/badge.svg?branch=develop)](https://coveralls.io/github/daviddamilola/Way-Farer-API?branch=develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d32912f0c6a037810aff/test_coverage)](https://codeclimate.com/github/daviddamilola/Way-Farer-API/test_coverage)
[![Build Status](https://travis-ci.org/daviddamilola/Way-Farer-API.svg?branch=develop)](https://travis-ci.org/daviddamilola/Way-Farer-API)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Way-Farer-API
WayFarer is a public bus transportation booking server. 

## Pivotal Tracker Project
https://www.pivotaltracker.com/n/projects/2359690

## API Documentation
https://documenter.getpostman.com/view/7432975/SVSKMUgr

## Heroku application
https://wayfarer-app-proj.herokuapp.com/api/v1/

## Table of Content
 * [Getting Started](#getting-started)

 * [Prerequisites for installation](#Prerequisites)
 
 * [Installation](#installation)

 * [Test](#test)
 
 * [ API End Points Test Using Postman](#api-end-points)

 * [Coding Style](#coding-style)
 
 * [Features](#features)
 
 * [Built With](#built-with)
 
 * [Author](#author)

 * [License](#license)


 ## Getting Started

### Prerequisites for installation
1. Node js
2. Express
3. Git

### Installation
1. Clone this repository into your local machine:
```
e.g git clone https://github.com/daviddamilola/Way-Farer-API
```
2. Install dependencies 
```
e.g npm install.
```
3. Start the application by running the start script.
```
e.g npm start
```
4. Install postman to test all endpoints on port 2000.

### Run Test

```
e.g npm test
```
### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/auth/signup</td>  <td>User can signup</td></tr>

<tr><td>POST</td> <td>/api/v1/auth/login</td>  <td>User can signin</td></tr>

<tr><td>POST</td> <td>/api/v1/trips</td>  <td>Admin can create a trip</td></tr>

<tr><td>POST</td> <td>/api/v1/bookings</td>  <td>Users can book a seat on a trip</td></tr>

<tr><td>GET</td> <td>/api/v1/trips</td>  <td>Users and Admin can view all trips</td></tr>

<tr><td>GET</td> <td>/api/v1/bookings</td>  <td>Admin can view all bookings, Users can view their own bookings</td></tr>

<tr><td>PATCH</td> <td>/api/v1/trips/:tripId</td>  <td>Admin can cancel a trip</td></tr>

<tr><td>DELETE</td> <td>/api/v1/bookings/:bookingId</td>  <td>Users can delete a booking</td></tr>

</table>

### Coding Style
* Airbnb style guide. 

## Features

### Users
* Users can sign up
* Users can login
* Users can book a seat on a trip.
* Users can delete their booking.

### Admin
* Admin can create a trip.
* Admin can cancel a trip.
* Both Admin and Users can see all trips.
* View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.
 

## Built With
* NodeJs-EXPRESS: Node.js is a javascript runtime built on Chrome's V8 javascript engine.

## Author
* Oluwasusi David Damilola

## License
This project is licensed under The MIT License (MIT) 

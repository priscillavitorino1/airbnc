# AirBNC

This project showcases a database design and implementation for an application, called AirBNC. It simulates key functionalities such as bookings, reviews, favourites, users, properties, images and property types. The aim is to demonstrate skills in relational database design, SQL queries, and backend integration.


# Database Schema

The database includes the following main tables:

- `users`: Stores data related to guests and hosts
- `properties`: Contains property descriptions and details posted by hosts
- `bookings`: Records guest reservations
- `reviews`: Stores feedback and ratings submitted by users for each property


# Technologies Used

1. Ensure to install all the dependencies listed below:
    - npm install dotenv
    - npm install pg
    - npm install pg-format

2. To run this locally, you'll need an 'airbnc_test' database set up on your machine. You can create it using:
    - npm run setup-db

This will run the file setup.sql

DROP DATABASE IF EXISTS airbnc_test;

CREATE DATABASE airbnc_test;

3. You'll need to add your database credentials in a .env file located at the root of the project.

PGDATABASE='airbnc_test'

4. To seed the database run following command:

npm run seed

# Author

Priscilla Vitorino - @priscillavitorino1

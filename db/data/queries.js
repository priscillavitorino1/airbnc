exports.createPropertyType = `CREATE TABLE property_types (
    property_type VARCHAR PRIMARY KEY,
    description TEXT NOT NULL);`;

exports.createUsers = `CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    surname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR,
    avatar VARCHAR,
    is_host BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

exports.createProperties = `CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
    location VARCHAR NOT NULL,
    price_per_night DECIMAL NOT NULL,
    description TEXT,
    host_id INT NOT NULL REFERENCES users(user_id));`;

exports.createAmenities =`CREATE TABLE amenities (
    amenity VARCHAR PRIMARY KEY);`;

exports.createPropertiesAmenities = `CREATE TABLE properties_amenities (
    property_amenities SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES properties(property_id),
    amenity_slug VARCHAR NOT NULL REFERENCES amenities(amenity)
    );`;

exports.createImages = `CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES properties(property_id),
    image_url VARCHAR NOT NULL,
    alt_text VARCHAR NOT NULL
    );`;

exports.createFavourites = `CREATE TABLE favourites (
    favourite_id SERIAL PRIMARY KEY,
    guest_id INT NOT NULL,
    property_id INT NOT NULL REFERENCES properties(property_id));`;

exports.createReviews = `CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES properties(property_id),
    guest_id INT NOT NULL REFERENCES users(user_id),
    rating INT NOT NULL,
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

exports.createBookings = `CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    property_id INT NOT NULL REFERENCES properties(property_id),
    guest_id INT NOT NULL REFERENCES users(user_id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;


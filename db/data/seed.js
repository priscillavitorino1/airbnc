const db = require("./connection")
const {formatUsers, 
        formatProperties, 
        formatAmenities, 
        formatPropertiesAmenities, 
        formatImages,
        formatFavourites,
        formatReviews,
        formatBookings} = require("../utils/format.js")
const format = require("pg-format")

async function seed(propertyTypesData, usersData, propertiesData, imagesData, favouritesData, reviewsData, bookingsData){
    //DROP
    await db.query("DROP TABLE IF EXISTS properties_amenities;");
    await db.query("DROP TABLE IF EXISTS amenities;");
    await db.query("DROP TABLE IF EXISTS images;")
    await db.query("DROP TABLE IF EXISTS favourites;")
    await db.query("DROP TABLE IF EXISTS reviews;")
    await db.query("DROP TABLE IF EXISTS bookings;")
    await db.query("DROP TABLE IF EXISTS properties;");
    await db.query("DROP TABLE IF EXISTS property_types;");
    await db.query("DROP TABLE IF EXISTS users;");
  
    
    //CREATE
    await db.query(`CREATE TABLE property_types (
                    property_type VARCHAR PRIMARY KEY,
                    description TEXT NOT NULL);`);
    
    await db.query(`CREATE TABLE users (
                    user_id SERIAL PRIMARY KEY,
                    first_name VARCHAR NOT NULL,
                    surname VARCHAR NOT NULL,
                    email VARCHAR NOT NULL,
                    phone_number VARCHAR,
                    avatar VARCHAR,
                    is_host BOOLEAN NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
    
    await db.query(`CREATE TABLE properties (
                    property_id SERIAL PRIMARY KEY,
                    name VARCHAR NOT NULL,
                    property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
                    location VARCHAR NOT NULL,
                    price_per_night DECIMAL NOT NULL,
                    description TEXT,
                    host_id INT NOT NULL REFERENCES users(user_id));`);

    await db.query(`CREATE TABLE amenities (
                    amenity VARCHAR PRIMARY KEY)`);
    
    await db.query(`CREATE TABLE properties_amenities (
                    property_amenities SERIAL PRIMARY KEY,
                    property_id INT NOT NULL REFERENCES properties(property_id),
                    amenity_slug VARCHAR NOT NULL REFERENCES amenities(amenity)
                    );`)
    
    await db.query(`CREATE TABLE images (
                    image_id SERIAL PRIMARY KEY,
                    property_id INT NOT NULL REFERENCES properties(property_id),
                    image_url VARCHAR NOT NULL,
                    alt_text VARCHAR NOT NULL
                    );`)

    await db.query(`CREATE TABLE favourites (
                    favourite_id SERIAL PRIMARY KEY,
                    guest_id INT NOT NULL,
                    property_id INT NOT NULL REFERENCES properties(property_id));`)

    await db.query(`CREATE TABLE reviews (
                    review_id SERIAL PRIMARY KEY,
                    property_id INT NOT NULL REFERENCES properties(property_id),
                    guest_id INT NOT NULL REFERENCES users(user_id),
                    rating INT NOT NULL,
                    comments TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );`)

    await db.query(`CREATE TABLE bookings (
                    booking_id SERIAL PRIMARY KEY,
                    property_id INT NOT NULL REFERENCES properties(property_id),
                    guest_id INT NOT NULL REFERENCES users(user_id),
                    check_in_date DATE NOT NULL,
                    check_out_date DATE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );`)

    //INSERT
        await db.query(
                        format(`INSERT INTO property_types (property_type, description)
                                VALUES %L RETURNING *;`,
                                propertyTypesData.map(({property_type, description}) => [property_type, description]))
                                
        );

        const formatedUsers = formatUsers(usersData)
        const {rows: insertedUsers} = await db.query(
                        format(`INSERT INTO users (first_name, surname, email, phone_number, avatar, is_host)
                                VALUES %L RETURNING *;`, formatedUsers.map(({first_name, surname, email, phone_number, avatar, is_host}) => {
                                        return [first_name, surname, email, phone_number, avatar, is_host]})
        ))

        const formatedProperties = formatProperties(propertiesData, insertedUsers)
        const {rows: insertedProperties} = await db.query(
                format(`
                INSERT INTO properties (name, property_type, location, price_per_night, description, host_id)
                VALUES %L RETURNING *;
                `, formatedProperties)
        )

        const formatedAmenities = formatAmenities(propertiesData)
        await db.query(
                        format(`INSERT INTO amenities (amenity) VALUES %L RETURNING *;`, formatedAmenities.map((item)=>[item]))
        )
        
        const formatedPropertiesAmenities = formatPropertiesAmenities(propertiesData, insertedUsers, insertedProperties);
        await db.query(format(`
                                INSERT INTO properties_amenities (property_id, amenity_slug)
                                VALUES %L;`, formatedPropertiesAmenities)
        )
        
        const formatedImages = formatImages(imagesData, insertedProperties)
        await db.query(
        format(`INSERT INTO images (property_id, image_url, alt_text)
                VALUES %L RETURNING *;`, formatedImages)
                
                )

        const formatedFavourites = formatFavourites(favouritesData, insertedUsers, insertedProperties)
        await db.query(
                format(`INSERT INTO favourites (guest_id, property_id)
                        VALUES %L RETURNING *;`, formatedFavourites)
                )

        const formatedReviews = formatReviews(insertedProperties, insertedUsers, reviewsData)
        await db.query(
                format(`INSERT INTO reviews (property_id, guest_id, rating, comments)
                        VALUES %L;`, formatedReviews)
        )

        const formatedBookings = formatBookings(insertedProperties, insertedUsers, bookingsData)
        await db.query(
                format(`INSERT INTO bookings(property_id, guest_id, check_in_date, check_out_date)
                        VALUES %L;`, formatedBookings)
        )
}

module.exports = seed;
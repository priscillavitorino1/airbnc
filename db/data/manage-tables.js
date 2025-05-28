const db = require("./connection")
const {
    createPropertyType,
    createUsers,
    createProperties,
    createAmenities,
    createPropertiesAmenities,
    createImages,
    createFavourites,
    createReviews,
    createBookings
} = require("./queries")

async function manageTables() {
    await db.query("DROP TABLE IF EXISTS properties_amenities;");
    await db.query("DROP TABLE IF EXISTS amenities;");
    await db.query("DROP TABLE IF EXISTS images;");
    await db.query("DROP TABLE IF EXISTS favourites;");
    await db.query("DROP TABLE IF EXISTS reviews;");
    await db.query("DROP TABLE IF EXISTS bookings;");
    await db.query("DROP TABLE IF EXISTS properties;");
    await db.query("DROP TABLE IF EXISTS property_types;");
    await db.query("DROP TABLE IF EXISTS users;");

    await db.query(createPropertyType);
    await db.query(createUsers);
    await db.query(createProperties);
    await db.query(createAmenities);
    await db.query(createPropertiesAmenities);
    await db.query(createImages);
    await db.query(createFavourites);
    await db.query(createReviews);
    await db.query(createBookings);
}

module.exports = manageTables;
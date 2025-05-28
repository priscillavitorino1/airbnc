const db = require("./connection")
const format = require("pg-format")
const manageTables = require("./manage-tables.js")
const {
        formatUsers, 
        formatProperties, 
        formatAmenities, 
        formatPropertiesAmenities, 
        formatImages,
        formatFavourites,
        formatReviews,
        formatBookings
} = require("../utils/format.js")


async function seed(propertyTypesData, usersData, propertiesData, imagesData, favouritesData, reviewsData, bookingsData){
    await manageTables();
    
        await db.query(
                        format(`INSERT INTO property_types (property_type, description)
                                VALUES %L RETURNING *;`,
                                propertyTypesData.map(({property_type, description}) => [property_type, description]))
                                
        );

        const formatedUsers = formatUsers(usersData)
        const {rows: insertedUsers} = await db.query(
                        format(`INSERT INTO users (first_name, surname, email, phone_number, avatar, is_host)
                                VALUES %L RETURNING *;`, formatedUsers)
        )

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
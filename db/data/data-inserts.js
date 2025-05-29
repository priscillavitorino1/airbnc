const db = require("./connection")
const format = require("pg-format")

function insertPropertyType (propertyTypesData){
    return db.query(
        
        format(`INSERT INTO property_types (property_type, description)
                VALUES %L RETURNING *;`,
                propertyTypesData.map(({property_type, description}) => [property_type, description]))
                
);
}

function insertUsers (formatedUsers){
    return db.query(
        format(`INSERT INTO users (first_name, surname, email, phone_number, avatar, is_host)
                VALUES %L RETURNING *;`, formatedUsers)
)
}

function insertProperties (formatedProperties){
    return db.query(
        format(`
        INSERT INTO properties (name, property_type, location, price_per_night, description, host_id)
        VALUES %L RETURNING *;
        `, formatedProperties)
)
}

function insertAmenities (formatedAmenities){
    return db.query(
        format(`INSERT INTO amenities (amenity) VALUES %L RETURNING *;`, formatedAmenities.map((item)=>[item]))
)
}

function insertPropertiesAmenities(formatedPropertiesAmenities){
    return db.query(format(`
        INSERT INTO properties_amenities (property_id, amenity_slug)
        VALUES %L;`, formatedPropertiesAmenities)
)
}

function insertImages(formatedImages){
    return db.query(
        format(`INSERT INTO images (property_id, image_url, alt_text)
                VALUES %L RETURNING *;`, formatedImages)
)
}

function insertFavourites(formatedFavourites){
    return db.query(
        format(`INSERT INTO favourites (guest_id, property_id)
                VALUES %L RETURNING *;`, formatedFavourites)
        )
}

function insertReviews(formatedReviews){
    return db.query(
        format(`INSERT INTO reviews (property_id, guest_id, rating, comments)
                VALUES %L;`, formatedReviews)
)
}

function insertBookings(formatedBookings){
    return db.query(
        format(`INSERT INTO bookings(property_id, guest_id, check_in_date, check_out_date)
                VALUES %L;`, formatedBookings)
)
}

module.exports = {
    insertPropertyType, 
    insertUsers, 
    insertProperties,
    insertAmenities,
    insertPropertiesAmenities,
    insertImages,
    insertFavourites,
    insertReviews,
    insertBookings
}
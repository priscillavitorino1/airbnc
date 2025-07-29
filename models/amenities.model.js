const db = require("../db/data/connection")

exports.fetchAmenities = async () => {
    const {rows: amenity_slug} = await db.query('SELECT * FROM amenities;')
    return amenity_slug
}
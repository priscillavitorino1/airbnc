const db = require("../db/data/connection")

exports.fetchProperties = async (sortby, order, maxPrice, minPrice, host_id) => {
    const {rows: properties} = await db.query(`SELECT 
        properties.property_id, 
        properties.name AS property_name, 
        properties.location, 
        properties.price_per_night,
        CONCAT(users.first_name, ' ', users.surname) AS host
        FROM properties
        INNER JOIN users 
        ON properties.host_id = users.user_id
        INNER JOIN favourites 
        ON properties.property_id = favourites.property_id 
        GROUP BY 
        properties.property_id, 
        properties.name, 
        properties.location, 
        properties.price_per_night, 
        users.first_name, 
        users.surname
        ORDER BY ${sortby} ${order};`)
    console.log(properties)
        //why do I need to use GROUP BY?
   return properties
}
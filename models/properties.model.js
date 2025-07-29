const db = require("../db/data/connection")

exports.fetchProperties = async (sortby = 'COUNT(favourites.property_id)', order = 'DESC', maxPrice, minPrice, host_id, amenity) => {
    let query = `SELECT 
        properties.property_id, 
        properties.name AS property_name, 
        properties.location, 
        properties.price_per_night,   
        CONCAT(users.first_name, ' ', users.surname) AS host,
        COUNT(favourites.property_id) AS favourite_count,
        image.image_url AS image,
        ARRAY_AGG(DISTINCT properties_amenities.amenity_slug) AS amenities
        FROM properties
        INNER JOIN users 
        ON properties.host_id = users.user_id
        LEFT JOIN (
            SELECT DISTINCT ON (property_id)
                property_id,
                image_url
            FROM images
            ORDER BY property_id ASC
            ) AS image
        ON properties.property_id = image.property_id
        LEFT JOIN favourites 
        ON properties.property_id = favourites.property_id
        INNER JOIN properties_amenities
        ON properties_amenities.property_id = properties.property_id `
    
    const value = []
    const optionalQueries = []
    
    if(maxPrice !== undefined){
        value.push(maxPrice)
        optionalQueries.push(`properties.price_per_night <= $${value.length}`)
    }

    if(minPrice !== undefined){
        value.push(minPrice)
        optionalQueries.push(`properties.price_per_night >= $${value.length}`)
    }

    if(host_id !== undefined){
        value.push(host_id)
        optionalQueries.push(`users.user_id = $${value.length}`)
    }

    let havingCount = '';
    if(amenity !== undefined && amenity.length > 0){
        if(!Array.isArray(amenity)) {
            amenity = [amenity]
        }
        value.push(amenity)
        optionalQueries.push(`properties_amenities.amenity_slug = ANY($${value.length}) `)
        value.push(amenity.length)
        havingCount = `HAVING COUNT(DISTINCT properties_amenities.amenity_slug) = $${value.length} `
    }

    if(optionalQueries.length > 0) {
        query += `WHERE ${optionalQueries.join(' AND ')} `
    }

    query += `GROUP BY 
        properties.property_id, 
        properties.name, 
        properties.location, 
        properties.price_per_night, 
        users.first_name, 
        users.surname,
        image.image_url 
        `
    
    if(havingCount) {
        query += havingCount
    }
        

    query += `ORDER BY ${sortby} ${order.toUpperCase()};`

    const {rows: properties} = await db.query(query, value)
   return properties
}

exports.fetchPropertyId = async (id, user_id) => {
    const value = [id]
    let query = `SELECT 
            properties.property_id,
            properties.name AS property_name,
            properties.location,
            properties.price_per_night,
            properties.description,
            CONCAT(users.first_name, ' ', users.surname) AS host,
            users.avatar AS host_avatar,
            COUNT(favourites.property_id) AS favourite_count,
            ARRAY_AGG(images.image_url) AS images`
    
    if(user_id){
        value.push(user_id)
        query += `, 
            EXISTS (
                SELECT 1 
                FROM favourites
                WHERE favourites.property_id = $1
                AND favourites.guest_id = $2)
            AS favourited`
    }
    
    query += ` FROM properties
        LEFT JOIN favourites
            ON favourites.property_id = properties.property_id
        INNER JOIN users
            ON users.user_id = properties.host_id
        INNER JOIN images
            ON images.property_id = properties.property_id
        WHERE properties.property_id = $1
        GROUP BY 
            properties.property_id, 
            properties.name, 
            properties.location, 
            properties.price_per_night,
            properties.description,
            users.avatar,
            users.first_name, 
            users.surname`

    const {rows: [property]} = await db.query(query, value)
        
    if(property === undefined){
        return Promise.reject({status: 404, msg:"Not found."})
    }

    return property
}


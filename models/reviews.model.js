const db = require("../db/data/connection")

exports.fetchPropertiesReview = async (id) =>{
    const {rows: reviews} = await db.query(`
        SELECT
            reviews.review_id,
            reviews.comments,
            reviews.rating,
            reviews.created_at,
            CONCAT(users.first_name, ' ', users.surname) AS guests,
            images.image_url AS guest_avatar
        FROM reviews
        INNER JOIN users
            ON reviews.guest_id = users.user_id
        INNER JOIN images
            ON images.property_id = $1
        GROUP BY 
            reviews.review_id,
            reviews.comments,
            reviews.rating,
            reviews.created_at,
            users.first_name, 
            users.surname,
            images.image_url
        ORDER BY
            reviews.created_at DESC`,[id])
        
        const {rows: average} = await db.query(`SELECT AVG(rating) FROM reviews`)
        if (reviews[0] === undefined){
            return Promise.reject({status: 404, msg:"Not found."})
        }
    return {reviews, average_rating: average[0].avg}
}

exports.addPropertiesReview = async(id, guest_id, rating, comments) => {
    const {rows} = await db.query(`
        INSERT INTO reviews (property_id, guest_id, rating, comments)
        VALUES ($1, $2, $3, $4) RETURNING *`, [id, guest_id, rating, comments])
    return rows[0]
}

exports.removePropertiesReview = async(id) => {
    const {rows} = await db.query(`
        DELETE FROM reviews
        WHERE review_id = $1`, [id])

    return rows
    
}
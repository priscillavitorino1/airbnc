const db = require("../db/data/connection")

exports.fetchUserId = async (id) => {
    const {rows: [user]} = await db.query(`
        SELECT 
            users.user_id,
            users.first_name,
            users.surname,
            users.email,
            users.phone_number,
            users.avatar,
            users.created_at
        FROM users
        WHERE user_id = $1`, [id])
    if(user === undefined){
        return Promise.reject({status: 404, msg:"Property not found."})
    }
    return user

}

exports.updateUserId = async ({id, first_name, surname, email, phone, avatar}) => {
    const keys = {first_name, surname, email, phone, avatar}
    const values = Object.entries(keys).filter(([key, value]) => {
        return value !== undefined
    })

    const updateUser = values.map(([key], index) => `${key} = $${index + 1}`).join(", ")

    const entries = values.map(([key, value]) => value)
    entries.push(id)

    let query = `
        UPDATE users 
        SET ${updateUser}
        WHERE user_id = $${entries.length}
        RETURNING *;`

    const {rows: [user]} = await db.query(query,entries)
    
    if(user.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found" });
    }
    return user
}
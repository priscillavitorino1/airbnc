const db = require("./connection")
const insertUsers = require("../utils/usersRef.js")
const insertProperty = require("../utils/propertyRef.js")
const format = require("pg-format")

async function seed(propertyTypesData, usersData, propertiesData){
    //DROP
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
                    host_id INT NOT NULL REFERENCES users(user_id),
                    name VARCHAR NOT NULL,
                    location VARCHAR NOT NULL,
                    property_type VARCHAR NOT NULL REFERENCES property_types(property_type),
                    price_per_night DECIMAL NOT NULL,
                    description TEXT)`);
    //INSERT
    await db.query(
                    format(`INSERT INTO property_types (property_type, description)
                            VALUES %L RETURNING *;`,
                            propertyTypesData.map(({property_type, description}) => [property_type, description]))
                            
                        );

    const transformUsers = insertUsers(usersData)
    await db.query(
                    format(`INSERT INTO users (first_name, surname, email, phone_number, avatar, is_host)
                            VALUES %L RETURNING *;`, transformUsers.map(({first_name, surname, email, phone_number, avatar, is_host}) => {
                                return [first_name, surname, email, phone_number, avatar, is_host]})
                            ))
    
    await db.query(
                    format(`INSERT INTO properties (host_id, name, location, property_type, price_per_night, description)
                    VALUES %L RETURNING *;`, insertProperty(propertiesData))
                )
}

module.exports = seed;
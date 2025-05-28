const db = require("./connection")
const format = require("pg-format")

function insertPropertyType (){
    return db.query(
        format(`INSERT INTO property_types (property_type, description)
                VALUES %L RETURNING *;`,
                propertyTypesData.map(({property_type, description}) => [property_type, description]))
                
);
}



module.exports = insertPropertyType
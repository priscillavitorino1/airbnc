const seed = require('./seed.js')
const db = require("./connection.js")
const {propertyTypesData, usersData, propertiesData} = require("./test/index.js")

seed(propertyTypesData, usersData, propertiesData).then(()=>{
    db.end();
});
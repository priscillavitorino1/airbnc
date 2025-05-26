const seed = require('./seed.js')
const db = require("./connection.js")
const {propertyTypesData, 
    usersData, 
    propertiesData, 
    imagesData,
    favouritesData,
    reviewsData,
    bookingsData} = require("./test/index.js")

seed(propertyTypesData, usersData, propertiesData, imagesData, favouritesData, reviewsData, bookingsData).then(()=>{
    db.end();
});
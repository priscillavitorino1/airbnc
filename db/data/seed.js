const manageTables = require("./manage-tables.js")
const {
        formatUsers, 
        formatProperties, 
        formatAmenities, 
        formatPropertiesAmenities, 
        formatImages,
        formatFavourites,
        formatReviews,
        formatBookings
} = require("../utils/format.js")

const {
        insertPropertyType, 
        insertUsers,
        insertProperties,
        insertAmenities,
        insertPropertiesAmenities,
        insertImages,
        insertFavourites,
        insertReviews,
        insertBookings
} = require("./data-inserts.js")


async function seed(propertyTypesData, usersData, propertiesData, imagesData, favouritesData, reviewsData, bookingsData){
    await manageTables();
    
    const { rows: insertedPropertyType } = await insertPropertyType(propertyTypesData)
    
    const formatedUsers = formatUsers(usersData)
    const {rows: insertedUsers} = await insertUsers(formatedUsers)
    
    const formatedProperties = formatProperties(propertiesData, insertedUsers)
    const {rows: insertedProperties} = await insertProperties(formatedProperties)
    
    const formatedAmenities = formatAmenities(propertiesData)
    await insertAmenities(formatedAmenities)
    
    const formatedPropertiesAmenities = formatPropertiesAmenities(propertiesData, insertedUsers, insertedProperties);
    await insertPropertiesAmenities(formatedPropertiesAmenities)
    
    const formatedImages = formatImages(imagesData, insertedProperties)
    await insertImages(formatedImages)
    
    const formatedFavourites = formatFavourites(favouritesData, insertedUsers, insertedProperties)
    await insertFavourites(formatedFavourites)
    
    const formatedReviews = formatReviews(insertedProperties, insertedUsers, reviewsData)
    await insertReviews(formatedReviews)
    
    const formatedBookings = formatBookings(insertedProperties, insertedUsers, bookingsData)
    await insertBookings(formatedBookings)
}

module.exports = seed;
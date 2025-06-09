const manageTables = require("./manage-tables.js")
const {
        formatUsers, 
        formatProperties, 
        formatAmenities, 
        formatPropertiesAmenities, 
        formatImages,
        formatFavourites,
        formatReviews,
        formatBookings,
        usersIdRef,
        propertiesIdRef
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

    await insertPropertyType(propertyTypesData)
    
    const formatedUsers = formatUsers(usersData)
    const {rows: insertedUsers} = await insertUsers(formatedUsers)
    
    const userRef = usersIdRef(insertedUsers)

    const formatedProperties = formatProperties(propertiesData, userRef)
    const {rows: insertedProperties} = await insertProperties(formatedProperties)
    
    const propertyRef = propertiesIdRef(insertedProperties)

    const formatedAmenities = formatAmenities(propertiesData)
    await insertAmenities(formatedAmenities)
    
    const formatedPropertiesAmenities = formatPropertiesAmenities(propertiesData, userRef, insertedProperties);
    await insertPropertiesAmenities(formatedPropertiesAmenities)
    
    const formatedImages = formatImages(imagesData, insertedProperties)
    await insertImages(formatedImages)
    
    const formatedFavourites = formatFavourites(favouritesData, userRef, insertedProperties)
    await insertFavourites(formatedFavourites)
    
    const formatedReviews = formatReviews(insertedProperties, userRef, reviewsData)
    await insertReviews(formatedReviews)
    
    const formatedBookings = formatBookings(insertedProperties, userRef, bookingsData)
    await insertBookings(formatedBookings)
}

module.exports = seed;
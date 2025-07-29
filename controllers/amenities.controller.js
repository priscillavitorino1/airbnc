const {
    fetchAmenities
} = require("../models/amenities.model")


exports.getAmenities = async (req, res, next) => {
    const amenities = await fetchAmenities()
    res.status(200).send({amenities}) 
}
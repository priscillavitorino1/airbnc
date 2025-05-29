const {fetchProperties} = require("../models/properties.model")

exports.getProperties = async (req, res, next) => {
    const {sortby = 'COUNT(DISTINCT favourites.property_id)', order = 'DESC', maxPrice, minPrice, host_id} = req.query
    const properties = await fetchProperties(sortby, order, maxPrice, minPrice, host_id)
    res.status(200).send({properties}) 
}
const {
    fetchProperties,
    fetchPropertyId
} = require("../models/properties.model")

exports.getProperties = async (req, res, next) => {
    const {sortby, order, maxPrice, minPrice, host_id} = req.query
    const properties = await fetchProperties(sortby, order, maxPrice, minPrice, host_id)
    res.status(200).send({properties}) 


}

exports.getPropertyId = async (req, res, next) => {
    const {id} = req.params
    const {user_id} = req.query
    const property = await fetchPropertyId(id, user_id)
    res.status(200).send({property})
}


const {
    fetchPropertiesReview,
    addPropertiesReview,
    removePropertiesReview
} = require("../models/reviews.model")

exports.getPropertiesReview = async (req, res, next) => {
    const {id} = req.params
    const {reviews, average_rating} = await fetchPropertiesReview(id)
    res.status(200).send({reviews, average_rating})
}

exports.postPropertiesReview = async (req, res, next) => {
    const {id} = req.params
    const {guest_id, rating, comments} = req.body
    const review = await addPropertiesReview(id, guest_id, rating, comments)
    res.status(201).send({review})

}

exports.deletePropertiesReview = async (req, res, next) => {
    const {id} = req.params
    const review = await removePropertiesReview(id)
    res.status(204).send({review})
}
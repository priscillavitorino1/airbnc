const {
    fetchUserId,
    updateUserId,
} = require("../models/users.model")

exports.getUserId = async (req, res, next) => {
    const {id} = req.params
    const user = await fetchUserId(id)
    res.status(200).send({user})
}

exports.patchUserId = async (req, res, next) => {
    const {id} = req.params
    const {first_name, surname, email, phone, avatar} = req.body
    const user = await updateUserId({id, first_name, surname, email, phone, avatar})
    res.status(200).send({user})
}
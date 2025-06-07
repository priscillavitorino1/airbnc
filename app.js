const express = require('express')
const {
    getProperties,
    getPropertyId
} = require("./controllers/properties.controller")

const {
    getUserId,
    patchUserId,
} = require("./controllers/users.controller")

const {
    getPropertiesReview,
    postPropertiesReview,
    deletePropertiesReview
} = require("./controllers/reviews.controler")

const {
    handlePathNotFound,
    handleDataNotFound,
    handleBadRequest
} = require("./controllers/errors")

const app = express()

app.use(express.json());

app.get("/api/properties", getProperties)

app.get("/api/properties/:id", getPropertyId)

app.get("/api/properties/:id/reviews", getPropertiesReview)

app.get("/api/users/:id", getUserId)

app.patch("/api/users/:id", patchUserId)

app.post("/api/properties/:id/reviews", postPropertiesReview)

app.delete("/api/reviews/:id", deletePropertiesReview)

app.all("/*invalid-path", handlePathNotFound)

app.use(handleDataNotFound)
app.use(handleBadRequest)

module.exports = app;
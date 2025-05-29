const express = require('express')
const {
    getProperties
} = require("./controllers/properties.controller")
const {
    handlePathNotFound
} = require("./controllers/errors")

const app = express()


app.get("/api/properties", getProperties)

app.all("/*invalid-path", handlePathNotFound)

module.exports = app;
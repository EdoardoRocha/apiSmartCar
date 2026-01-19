const express = require("express")
const cors = require("cors")
const swaggerOptions = require("./swagger.js")
const swaggerDocs = require("swagger-jsdoc")(swaggerOptions);
const swaggerUi = require("swagger-ui-express")

module.exports = app => {
    app.use(express.json())
    app.use(cors())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
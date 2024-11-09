const express = require('express');
const CONFIG = require("../configuration/config");
const path = require('path');
const LOGGER = require("../../Logger/logger");

function defineUIRoutes(app) {
    LOGGER.info("Defining UI routes...");
    app.use(express.static(path.join(__dirname, "../static")));
}

function defineAPIRoutes(app) {
    LOGGER.info("Defining API routes...");
    app.use("/api/", getAPIRouter());
}

function getAPIRouter() {
    const router = express.Router();
    router.get("/version", (req, res) => {
        res.json({ version: "1.0" });
    });
    return router;
}

module.exports = {
    defineUIRoutes,
    defineAPIRoutes
}
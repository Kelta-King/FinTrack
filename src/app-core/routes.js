const express = require('express');
const CONFIG = require("../configuration/config");
const path = require('path');

function defineUIRoutes(app) {
    app.use(express.static(path.join(__dirname, "../static")));
}

function defineAPIRoutes(app) {
    app.use("/api/", getAPIRouter());
}

function getAPIRouter(api_version) {
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
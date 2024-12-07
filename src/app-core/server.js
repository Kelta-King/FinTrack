const express = require('express');
const ROUTES_MANAGER = require("./routesManager");
const CONFIG = require("../configuration/config");
const LOGGER = require("../Logger/logger");

function startServer() {
    LOGGER.info("Starting server...");

    const app = express();
    app.use(express.json());

    ROUTES_MANAGER.defineUIRoutes(app);
    ROUTES_MANAGER.defineAPIRoutes(app);

    app.listen(CONFIG.PORT, () => {
        LOGGER.info(`Server started on port ${CONFIG.PORT}`);
    });
}

module.exports = {
    startServer
}
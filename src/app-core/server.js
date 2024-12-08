const express = require('express');
const ROUTES_MANAGER = require("./routesManager");
const CONFIG = require("../configuration/config");
const LOGGER = require("../Logger/logger");

function startServer() {
    LOGGER.info("Starting server...");

    const app = express();
    app.use(express.json());

    // API routes must come first.
    ROUTES_MANAGER.defineAPIRoutes(app);

    // UI routes should come after API routes. 
    // They are used to serve static files and all other requests with HTML file.
    ROUTES_MANAGER.defineUIRoutes(app);

    app.listen(CONFIG.PORT, () => {
        LOGGER.info(`Server started on port ${CONFIG.PORT}`);
    });
}

module.exports = {
    startServer
}
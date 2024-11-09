const express = require('express');
const ROUTES_MANAGER = require("./routes");
const CONFIG = require("../configuration/config");
const LOGGER = require("../../Logger/logger");
const path = require("path");

function startServer() {
    const app = express();

    app.use(express.json());

    ROUTES_MANAGER.defineUIRoutes(app);
    ROUTES_MANAGER.defineAPIRoutes(app);

    setTimeout(() => {
        app.listen(CONFIG.PORT, () => {
            LOGGER.fatal(`Server started on port ${CONFIG.PORT}`);
        });
    },1000);
}

module.exports = {
    startServer
}
const express = require('express');
const CONFIG = require("../configuration/config");
const path = require('path');
const LOGGER = require("../../Logger/logger");
const CONTROLLER = require("./controller/v1/controllers");

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
    
    LOGGER.debug("Version route created");
    router.get("/version", CONTROLLER.versionController);

    LOGGER.debug("Dashboard route created");
    router.get("/dashboard", CONTROLLER.dashboardController);

    LOGGER.debug("Expenses route created");
    router.get("/expenses", CONTROLLER.expensesController);

    LOGGER.debug("AutoDebits route created");
    router.get("/autodebits", CONTROLLER.autoDebitsController);

    LOGGER.debug("Account route created");
    router.get("/account", CONTROLLER.accountController);

    LOGGER.debug("Preferences route created");
    router.get("/preferences", CONTROLLER.preferencesController);

    LOGGER.debug("Settings route created");
    router.get("/settings", CONTROLLER.settingsController);

    return router;
}

module.exports = {
    defineUIRoutes,
    defineAPIRoutes
}
const express = require('express');
const CONFIG = require("../configuration/config");
const path = require('path');
const LOGGER = require("../Logger/logger");
const CONTROLLER = require("./controller/controllers");
const AUTH_API = require("./auth/authAPI");

function defineUIRoutes(app) {
    LOGGER.info("Defining UI routes...");
    app.use(express.static(path.join(__dirname, "../static")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../static", "index.html"));
    });
}

function defineAPIRoutes(app) {
    LOGGER.info("Defining API routes...");
    app.use("/api/", getAPIRouter());
}

function defineAuthRoutes(app) {
    LOGGER.info("Defining auth routes...");
    app.post("/signin", CONTROLLER.signIn);
    app.get("/signout", CONTROLLER.signOut);
}

function getAPIRouter() {
    const router = express.Router();
    
    LOGGER.debug("Version route created");
    router.get("/version", AUTH_API.verifyToken, CONTROLLER.versionController);

    LOGGER.debug("Dashboard route created");
    router.get("/dashboard", AUTH_API.verifyToken, CONTROLLER.dashboardController);

    LOGGER.debug("Expenses route created");
    router.get("/expenses", AUTH_API.verifyToken, CONTROLLER.expensesController);

    LOGGER.debug("AutoDebits route created");
    router.get("/autodebits", AUTH_API.verifyToken, CONTROLLER.autoDebitsController);

    LOGGER.debug("Account route created");
    router.get("/account", AUTH_API.verifyToken, CONTROLLER.accountController);

    LOGGER.debug("Preferences route created");
    router.get("/preferences", AUTH_API.verifyToken, CONTROLLER.preferencesController);

    LOGGER.debug("Settings route created");
    router.get("/settings", AUTH_API.verifyToken, CONTROLLER.settingsController);

    return router;
}

module.exports = {
    defineUIRoutes,
    defineAPIRoutes,
    defineAuthRoutes
}
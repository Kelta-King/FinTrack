const CONFIG = require("../../configuration/config");
const NETWORK_CONFIG = require("../common/NETWORK_CONFIG");

function versionController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        version: CONFIG.APP_VERSION
    });
}

function dashboardController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Dashboard data"
    });
}

function expensesController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Expenses data"
    });
}

function autoDebitsController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Auto debits data"
    });
}

function settingsController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Settings data"
    });    
}

function preferencesController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Preferences data"
    });
}

function accountController(req, res) {
    res.status(NETWORK_CONFIG.STATUS.OK).send({
        message: "Account data"
    });
}

module.exports = {
    versionController,
    dashboardController,
    expensesController,
    autoDebitsController,
    settingsController,
    preferencesController,
    accountController,
}
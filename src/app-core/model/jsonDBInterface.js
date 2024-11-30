const MACROS = require("./MACROS");

console.log(MACROS);


const RESPONSE_TEMPLATE = {
    success: false,
    message: '',
    data: null
}

function getTotalOverview() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getWeeklyTotalOverview() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getMonthlyTotalOverview() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getYearlyTotalOverview() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getDayExpenses(limit) {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getAutodebitDetails() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getUserDetails() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

function getTotalInvestmentDetails() {
    var response = RESPONSE_TEMPLATE;
    return response;
}

// function getYearlyTotalOverview() {

// }

// function getYearlyTotalOverview() {

// }

module.exports = {
    getMonthlyTotalOverview,
    getYearlyTotalOverview,
    getDayExpenses,
    getAutodebitDetails,
    getUserDetails,
    getTotalInvestmentDetails,
}
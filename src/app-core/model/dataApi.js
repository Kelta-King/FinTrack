const LOGGER = require("../../Logger/logger");
const dbInterface = require("./JsonDBInterface/jsonDBInterface");
const { MONTHS_MAPPING, ERROR_CODES } = require("./MACROS/MACROS");

class DataAPI {
    RESPONSE_tEMPLATE = {
        message: "",
        data: null,
        errorCode: null,
    }

    _getCurrentMonth = () => {
        const today = new Date();
        const month = String(today.getMonth());
        return month;
    };
    
    _getCurrentYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        return year;
    };
    
    getCurrentMonthOverview = () => {
        var response = { ...this.RESPONSE_tEMPLATE };
        var ret = dbInterface.getMonthlyTotalOverview(); // No parameter, so it takes current date
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }
    
    getCurrentYearOverview = () => {
        var response = { ...this.RESPONSE_tEMPLATE };
        var ret = dbInterface.getYearlyTotalOverview(); // No parameter, so it takes current date
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }
    
    getRecentTransactions = (limit) => {
    
    }
    
    getTotalOverview = () => {
        var response = { ...this.RESPONSE_tEMPLATE };
        var ret = dbInterface.getTotalOverview();
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }
    
    getUserDetails = () => {
        var response = { ...this.RESPONSE_tEMPLATE };
        var ret = dbInterface.getUserDetails();
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }

    getPastMonthsOverview = (limitOfMonths) => {
    
    }
    
    getUpcomingAutoDebits = (limitOfAutoDebits) => {
    
    }
    
    getCurrentMonthCompleteDetails = () => {
    
    }

    getMonthOverview = (month = null, year = null) => {
        var response = { ...this.RESPONSE_tEMPLATE };
        if(month == null) {
            LOGGER.error(`Invalid month: ${month}`);
            response.data = null;
            response.errorCode = ERROR_CODES.SERVER_ERROR;
            response.message = `Invalid month: ${month}`;
            return response;
        }
        if(year == null) {
            LOGGER.error(`Invalid year ${year}`);
            response.data = null;
            response.errorCode = ERROR_CODES.SERVER_ERROR;
            response.message = `Invalid year: ${year}`;
            return response;
        }
        var ret = dbInterface.getMonthlyTotalOverview(month, year);
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }

    getYearOverview = (year = null) => {
        var response = { ...this.RESPONSE_tEMPLATE };
        if(year == null) {
            LOGGER.error(`Invalid year ${year}`);
            response.data = null;
            response.errorCode = ERROR_CODES.SERVER_ERROR;
            response.message = `Invalid year: ${year}`;
            return response;
        }
        
        var ret = dbInterface.getYearlyTotalOverview(year);
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }
    
    getMonthCompleteDetails = (month = null, year = null) => {
    
    }
    
    getAutoDebitDetails = () => {
        var response = { ...this.RESPONSE_tEMPLATE };
        var ret = dbInterface.getAutodebitDetails();
        if(ret.success != true) {
            if(response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            }
            else {
                response.errorCode = ERROR_CODES.SERVER_ERROR;
            }
            response.message = ret.message;
            response.data = null;
            return response;
        }
        response.data = ret.data;
        response.message = ret.message;
        response.errorCode = ERROR_CODES.NONE;
        return response;
    }
    
    addAutoDebit = (data = null) => {
    
    }
    
    editAutoDebit = (id = null, data = null) => {
    
    }
    
    deleteAutoDebit = (id = null) => {
    
    }
    
    addExpense = (date = null, data = null) => {
    
    }
    
    editExpense = (id = null, data = null) => {
    
    }
    
    deleteExpense = (id = null) => {
    
    }
}

const dataApi = new DataAPI();

module.exports = dataApi;
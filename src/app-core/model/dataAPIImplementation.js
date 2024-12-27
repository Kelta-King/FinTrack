const LOGGER = require("../../Logger/logger");
const dbInterface = require("./JsonDBInterface/jsonDBInterface");
const {
    MONTHS_MAPPING,
    ERROR_CODES,
    SPECIFICATION_DATA,
    MONTHLY_DETAILS_OBJECT_TEMPLATE,
} = require("./MACROS/MACROS");

class DataAPIImpl {

    RESPONSE_TEMPLATE = {
        message: "",
        data: null,
        errorCode: null,
    };

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
        var response = { ...this.RESPONSE_TEMPLATE };
        var ret = dbInterface.getMonthlyTotalOverview(); // No parameter, so it takes current date
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    getCurrentYearOverview = () => {
        var response = { ...this.RESPONSE_TEMPLATE };
        var ret = dbInterface.getYearlyTotalOverview(); // No parameter, so it takes current date
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    getRecentTransactions = (limit) => {
        var response = { ...this.RESPONSE_TEMPLATE };

        if (typeof limit !== "number") {
            LOGGER.error("Invalid input for 'limit' parameter. Expected a number.");
            response.errorCode = ERROR_CODES.INVALID_INPUT;
            response.message =
                "Invalid input for 'limit' parameter. Expected a number.";
            response.data = null;
            return response;
        }

        if (limit > SPECIFICATION_DATA.MAX_RECENT_TRANSACTION_COUNT) {
            LOGGER.error(
                `Invalid input for 'limit' parameter. Expected less than ${SPECIFICATION_DATA.MAX_RECENT_TRANSACTION_COUNT + 1
                } Provided: ${limit}`
            );
            response.errorCode = ERROR_CODES.INVALID_INPUT;
            response.message = `Invalid input for 'limit' parameter. Expected less than ${SPECIFICATION_DATA.MAX_RECENT_TRANSACTION_COUNT + 1
                } Provided: ${limit}`;
            response.data = null;
            return response;
        }

        var transactions_list = [];
        var currentDate = new Date();
        var tryCount = 0;

        while (
            transactions_list.length < limit &&
            tryCount < SPECIFICATION_DATA.MAX_TRY_FOR_RECENT_TRANSACTION_COUNT
        ) {
            let day = currentDate.getDate().toString().padStart(2, "0");
            let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            let year = currentDate.getFullYear().toString(); // Get the last 2 digits of the year

            var date = `${day}-${month}-${year}`;
            var ret = dbInterface.getDailyExpenseDetails(date);
            if (ret.success == true) {
                var data = ret.data;
                if (data.hasOwnProperty("expenses_list")) {
                    transactions_list = [...transactions_list, ...data["expenses_list"]];
                }
            }
            currentDate.setDate(currentDate.getDate() - 1);
            tryCount++;
        }

        response.data = transactions_list;
        response.message = "Transaction list fetched";
        response.errorCode = ERROR_CODES.NONE;
        return response;
    };

    getTotalOverview = () => {
        var response = { ...this.RESPONSE_TEMPLATE };
        var ret = dbInterface.getTotalOverview();
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    getUserDetails = () => {
        var response = { ...this.RESPONSE_TEMPLATE };
        var ret = dbInterface.getUserDetails();
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    setUserDetails = (data) => {
        var response = { ...this.RESPONSE_TEMPLATE };
        var ret = dbInterface.setUserDetails(data);
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
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
        var response = { ...this.RESPONSE_TEMPLATE };

        if (typeof limitOfMonths !== "number") {
            LOGGER.error(
                "Invalid input for 'limitOfMonths' parameter. Expected a number."
            );
            response.errorCode = ERROR_CODES.INVALID_INPUT;
            response.message =
                "Invalid input for 'limitOfMonths' parameter. Expected a number.";
            response.data = null;
            return response;
        }

        if (limitOfMonths > SPECIFICATION_DATA.MAX_MONTH_LIMIT_FOR_OVERVIEW) {
            LOGGER.error(
                `Invalid input for 'limitOfMonths' parameter. Expected less than ${SPECIFICATION_DATA.MAX_MONTH_LIMIT_FOR_OVERVIEW + 1
                } Provided: ${limitOfMonths}`
            );
            response.errorCode = ERROR_CODES.INVALID_INPUT;

            response.message = `Invalid input for 'limitOfMonths' parameter. Expected less than ${SPECIFICATION_DATA.MAX_MONTH_LIMIT_FOR_OVERVIEW + 1
                } Provided: ${limitOfMonths}`;
            response.data = null;
            return response;
        }

        var currentDate = new Date();
        var currentMonth = currentDate.getMonth(); 
        var currentYear = currentDate.getFullYear(); 
        var monthlyDetails = [];

        while (monthlyDetails.length < limitOfMonths) {
            const month = String(currentMonth + 1).padStart(2, "0");
            const year = currentYear; 
            
            var ret = dbInterface.getMonthlyTotalOverview(month, year);
            console.log(month, year);
            
            if (ret.success == true) {
                var data = ret.data;
                monthlyDetails.push({
                    month: MONTHS_MAPPING[Number.parseInt(month)],
                    year: currentYear,
                    data: data
                });
            }
            else {
                monthlyDetails.push({
                    month: MONTHS_MAPPING[Number.parseInt(month)],
                    year: currentYear,
                    data: {...MONTHLY_DETAILS_OBJECT_TEMPLATE}
                });
            }

            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11; 
                currentYear--; 
            }            
        }
        response.message = "Past Monthly Details Fetched";
        response.errorCode = ERROR_CODES.NONE;
        response.data = monthlyDetails;
        return response;
    };

    getUpcomingAutoDebits = (limitOfAutoDebits) => { };

    getCurrentMonthCompleteDetails = () => { };

    getMonthOverview = (month = null, year = null) => {
        var response = { ...this.RESPONSE_TEMPLATE };
        if (month == null) {
            LOGGER.error(`Invalid month: ${month}`);
            response.data = null;
            response.errorCode = ERROR_CODES.SERVER_ERROR;
            response.message = `Invalid month: ${month}`;
            return response;
        }
        if (year == null) {
            LOGGER.error(`Invalid year ${year}`);
            response.data = null;
            response.errorCode = ERROR_CODES.SERVER_ERROR;
            response.message = `Invalid year: ${year}`;
            return response;
        }
        var ret = dbInterface.getMonthlyTotalOverview(month, year);
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    getYearOverview = (year = null) => {
        var response = { ...this.RESPONSE_TEMPLATE };
        if (year == null) {
            LOGGER.error(`Invalid year ${year}`);
            response.data = null;
            response.errorCode = ERROR_CODES.SERVER_ERROR;
            response.message = `Invalid year: ${year}`;
            return response;
        }

        var ret = dbInterface.getYearlyTotalOverview(year);
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    getMonthCompleteDetails = (month = null, year = null) => { };

    getAutoDebitDetails = () => {
        var response = { ...this.RESPONSE_TEMPLATE };
        var ret = dbInterface.getAutodebitDetails();
        if (ret.success != true) {
            if (response.message.includes("Not Found")) {
                response.errorCode = ERROR_CODES.NOT_FOUND;
            } else {
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
    };

    addAutoDebit = (data = null) => { 
        
    };

    editAutoDebit = (id = null, data = null) => { };

    deleteAutoDebit = (id = null) => { };

    addExpense = (date = null, data = null) => { };

    editExpense = (id = null, data = null) => { };

    deleteExpense = (id = null) => { };
}

module.exports = DataAPIImpl;
